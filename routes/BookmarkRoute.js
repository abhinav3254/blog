const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark')


router.get('/test',(req,res) => {
	return res.json({message:'Hola from bookmark route'});
});

// Route for saving a bookmark
router.post('/save/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.userId;

        if (!blogId || !userId) {
            return res.status(400).json({ message: 'Blog ID and user ID are required.' });
        }

        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Check if a bookmark already exists for this user and blog
        let bookmark = await Bookmark.findOne({ user: userId });

        if (!bookmark) {
            // Create a new bookmark entry if it doesn't exist
            bookmark = new Bookmark({
                user: userId,
                blog: [blogId]
            });
        } else {
            // Add the blog to the existing bookmark entry if it's not already there
            if (!bookmark.blog.includes(blogId)) {
                bookmark.blog.push(blogId);
            }
        }

        // Save the bookmark
        await bookmark.save();

        return res.status(200).json({ message: 'Blog bookmarked successfully.', bookmark });

    } catch (err) {
        return res.status(500).json({ message: 'An error occurred while bookmarking the blog. Please try again later.', error: err.message });
    }
});



// Route for fetching bookmarked blogs of the logged-in user
router.get('/my-bookmarks', async (req, res) => {
    try {
        const userId = req.user.userId; 

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch bookmarks for the user
        const bookmarks = await Bookmark.find({ user: userId })
            .sort({ createdAt: -1 }) // Sort by date in descending order
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'blog',
                select: 'title imageUrl content publishedDate'
            });

        // Count total number of bookmarks for pagination
        const totalBookmarks = await Bookmark.countDocuments({ user: userId });

        // Return paginated and sorted bookmarks
        return res.status(200).json({
            totalBookmarks,
            totalPages: Math.ceil(totalBookmarks / limit),
            currentPage: page,
            bookmarks
        });

    } catch (err) {
        return res.status(500).json({ message: 'An error occurred while fetching bookmarks. Please try again later.', error: err.message });
    }
});

// Route for deleting a bookmark
router.delete('/remove/:id', async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming req.user contains the logged-in user's ID
        const bookmarkId = req.params.id;

        // Validate bookmark ID
        if (!bookmarkId) {
            return res.status(400).json({ message: 'Bookmark ID is required.' });
        }

        // Find and delete the bookmark for the specific user
        const bookmark = await Bookmark.findOneAndDelete({
            _id: bookmarkId,
            user: userId
        });

        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found or does not belong to the user.' });
        }

        return res.status(200).json({ message: 'Bookmark deleted successfully.' });

    } catch (err) {
        return res.status(500).json({ message: 'An error occurred while deleting the bookmark. Please try again later.', error: err.message });
    }
});


module.exports = router;