const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const users = require("../models/User");

router.get("/test", (req, res) => {
  return res.json({ message: "Hola from blog route" });
});

// Route for creating a blog post
router.post("/create", upload.single("imageUrl"), async (req, res) => {
  try {
    const { title, content, tags, category, description } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message:
          "Title, content, and category are required fields for creating a blog post.",
      });
    }

    const imageUrl = req.file ? req.file.path : null;
    console.log(req.file, req.file.path);
    if (imageUrl) {
      imageUrl = imageUrl.replace(/\\/g, "\\");
    }
    const readTime = Math.ceil(content.length / 200);
    const newBlog = new Blog({
      title,
      author: req.user.userId,
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      category,
      imageUrl,
      readTime,
      description,
    });

    const savedBlog = await newBlog.save();

    return res.status(201).json({
      message: "Blog post created successfully.",
      blogId: savedBlog._id,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while creating the blog post. Please try again later.",
      error: err.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.user.userId;
    const user = await users.findById(userId);

    // Fetch blogs sorted by publishedDate and apply pagination
    const withOutIsLiked = await Blog.find()
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        select: "comment date",
        populate: {
          path: "user",
          select: "username profilePicture",
        },
      })
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Count total number of blogs for pagination
    const totalBlogs = await Blog.countDocuments();
    const blogs = withOutIsLiked.map((item) => {
      const blogObj = item.toObject();
      // Check if the user has liked this blog
      if (user.likedPost.includes(blogObj._id.toString())) {
        blogObj.isLiked = true;
      }
      if (user.bookmarked.includes(blogObj._id.toString())) {
        blogObj.isBookmarked = true;
      }
      return blogObj;
    });
    // Return paginated and sorted blogs
    return res.status(200).json({
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while fetching blogs. Please try again later.",
      error: err.message,
    });
  }
});

// like a blog
router.put("/like/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json({ message: "Blog ID is required." });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (blog.like === undefined) {
      blog.like = 0;
    }
    const userId = req.user.userId;
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.likedPost.includes(id)) {
      user.likedPost.push(id); // Add the blog ID to the user's liked posts
      blog.like += 1; // Increment the like count

      // Save the updated user and blog documents
      await user.save();
      await blog.save();

      return res
        .status(200)
        .json({ message: "Blog liked successfully.", likes: blog.like });
    } else {
      const index = user.likedPost.indexOf(id);
      if (index > -1) {
        user.likedPost.splice(index, 1);
      }
      blog.like -= 1;
      return res
        .status(200)
        .json({ message: "You have unliked this blog." });
    }
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while liking the blog. Please try again later.",
      error: err.message,
    });
  }
});

// Route for adding a comment to a blog post
router.put("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { comment } = req.body;

    const userId = req.user.userId;

    // Validate ID and comment data
    if (!id) {
      return res.status(400).json({ message: "Blog ID is required." });
    }
    if (!userId || !comment) {
      return res
        .status(400)
        .json({ message: "User ID and comment are required." });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Create a new comment
    const newComment = new Comment({
      user: userId,
      comment,
    });

    // Save the comment
    const savedComment = await newComment.save();

    // Add the comment to the blog's comments array
    blog.comments.push(savedComment._id);

    // Save the updated blog
    await blog.save();

    return res
      .status(200)
      .json({ message: "Comment added successfully.", comment: savedComment });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while adding the comment. Please try again later.",
      error: err.message,
    });
  }
});

// delete comment
router.delete("/comment/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    // Validate ID
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required." });
    }

    // Find the comment to be deleted
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Find the blog that contains this comment
    const blog = await Blog.findOne({ comments: commentId });
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog containing the comment not found." });
    }

    // Remove the comment from the blog's comments array
    blog.comments = blog.comments.filter((id) => !id.equals(commentId));

    // Save the updated blog
    await blog.save();

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while deleting the comment. Please try again later.",
      error: err.message,
    });
  }
});

// update comment
router.put("/comment/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;

    // Validate ID and comment data
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required." });
    }
    if (!comment) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    // Find the comment by ID
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Update the comment content
    existingComment.comment = comment;

    // Save the updated comment
    const updatedComment = await existingComment.save();

    return res.status(200).json({
      message: "Comment updated successfully.",
      comment: updatedComment,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while updating the comment. Please try again later.",
      error: err.message,
    });
  }
});

// my blogs
// Route for fetching blogs by the currently logged-in user
router.get("/my-blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Assuming req.user.userId contains the ID of the logged-in user
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch blogs authored by the logged-in user, sorted by publishedDate and apply pagination
    const blogs = await Blog.find({ author: userId })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        select: "comment date",
        populate: {
          path: "user",
          select: "username profilePicture",
        },
      })
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Count total number of blogs by the user for pagination
    const totalBlogs = await Blog.countDocuments({ author: userId });

    // Return paginated and sorted blogs
    return res.status(200).json({
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while fetching blogs. Please try again later.",
      error: err.message,
    });
  }
});

// Route for updating a blog post
router.put("/update/:id", upload.single("imageUrl"), async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, tags, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    // Validate input
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required." });
    }

    // Find the blog post
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog." });
    }

    // Update the blog post
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content = content || blog.content;
    blog.tags = tags ? tags.split(",").map((tag) => tag.trim()) : blog.tags;
    blog.category = category || blog.category;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.readTime = Math.ceil(blog.content.length / 200); // Recalculate read time

    const updatedBlog = await blog.save();

    return res
      .status(200)
      .json({ message: "Blog updated successfully.", blog: updatedBlog });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while updating the blog post. Please try again later.",
      error: err.message,
    });
  }
});

// Route for deleting a blog post
router.delete("/delete/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    // Validate input
    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required." });
    }

    // Find the blog post
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog." });
    }

    // Delete the blog post
    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    return res.status(500).json({
      message:
        "An error occurred while deleting the blog post. Please try again later.",
      error: err.message,
    });
  }
});

// search blogs
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({
      $text: { $search: query },
    })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        select: "comment date",
        populate: {
          path: "user",
          select: "username profilePicture",
        },
      })
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments({
      $text: { $search: query },
    });

    return res.status(200).json({
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while searching for blogs.",
      error: err.message,
    });
  }
});

// get blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId)
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        select: "comment date",
        populate: {
          path: "user",
          select: "username profilePicture",
        },
      });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while fetching the blog details.",
      error: err.message,
    });
  }
});

module.exports = router;
