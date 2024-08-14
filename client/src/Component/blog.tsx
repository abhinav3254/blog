import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import filledHeart from "../assets/filled_heart.png";
import outLinedHeart from "../assets/outlined_heart.png";

import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component

import {
  bookmarkBlog,
  deleteBlog,
  getBlogMyBlogs,
  getBlogs,
  getBookmarks,
  likeBlog,
  removeBookmark,
} from "../Services/blog";
import "../Styles/blog.scss";

const Blog = (props: any) => {
  const { pageDetails } = props;
  const navigate = useNavigate();
  // const userId =  useSelector((state: RootState) => state.App.userId);
  const userId = localStorage.getItem("userId") || "";

  const [blogs, setBlogs] = useState<any>();
  const [currentPage, setcurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);
  const [deleteDialog, setdeleteDialog] = useState({
    visible: false,
    id: null,
  });
  const toast: any = useRef(null);

  const showToast = (type: string, message: string) => {
    toast.current.show({ severity: type, detail: message });
  };
  const handleCardClick = (id: any) => {
    if (id) {
      navigate("/myblog", { state: { id } });
    }
  };
  const onPageChange = (event: any) => {
    setcurrentPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };
  const getData = () => {
    if (pageDetails == "bookmarks") {
      getBookmarks()
        .then((res: any) => {
          let blogs = res.data.bookmarks[0].blog;
          console.log(blogs);
          setBlogs(blogs);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else if (pageDetails == "mypost") {
      getAllByIdBlogs(userId);
    } else {
      getAllByAllBlogs();
    }
  };
  const location = useLocation();
  useEffect(() => {
    getData();
  }, [currentPage]);

  const getAllByIdBlogs = (id: any) => {
    getBlogMyBlogs(currentPage)
      .then((res: any) => {
        setBlogs(res.data.blogs);
        console.log(blogs);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log("err", err);
      });
    // getBlogById(id, currentPage)
    //   .then((res: any) => {
    //     setBlogs(res.data.blogs);
    //     console.log(blogs);
    //     setTotalPages(res.data.totalPages);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  };
  const getAllByAllBlogs = () => {
    getBlogs(currentPage)
      .then((res: any) => {
        console.log(res);
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        // showToast('error',err.data.message)
        console.log("err", err);
      });
  };
  const handleBookmark = (id: any) => {
    const index = blogs.findIndex((item: any) => item._id === id);
    if (index !== -1) {
      const updatedBlogs = [...blogs];
      const blog = updatedBlogs[index];
      console.log(blog);
      if (blog.isBookmarked) {
        blog.isBookmarked = false;
        removeBookmark(id)
          .then((res: any) => {})
          .catch((err) => {
            blog.isBookmarked = true;
          });
      } else {
        blog.isBookmarked = true;
        bookmarkBlog(id)
          .then((res: any) => {})
          .catch((err) => {
            blog.isBookmarked = false;
          });
      }
      setBlogs(updatedBlogs);
    }
  };
  const likeABlog = (id: any) => {
    likeBlog(id)
      .then((res: any) => {
        const index = blogs.findIndex((item: any) => item._id === id);
        if (index !== -1) {
          const updatedBlogs = [...blogs];
          const blog = updatedBlogs[index];
          if (blog.isLiked) {
            blog.like -= 1;
            blog.isLiked = false;
          } else {
            blog.like += 1;
            blog.isLiked = true;
          }
          setBlogs(updatedBlogs);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleDeleteBlog = () => {
    deleteBlog(deleteDialog.id)
      .then((res: any) => {
        showToast("success", "Deleted Successfully!");
        getData();
      })
      .catch((err) => {
        console.log("err", err);
      });
    setdeleteDialog({ visible: false, id: null });
  };

  const editPost = (blog: any) => {
    navigate("/create", { state: blog });
  };
  return (
    <div className="blog">
      {blogs &&
        blogs.map((blog: any, index: any) => {
          return (
            <div
              className="blog-card"
           
            >
              <section
                className={
                  index % 2 !== 0
                    ? "blog-section blog-section--reverse"
                    : "blog-section"
                }
              >
                <div className="blog-section__content">
                  <div>
                    <h2>{blog.title}</h2>
                    {blog.description}
                  </div>
                  <div className="blog-section__footer">
                    <div>
                      <span
                        className="heart-button"
                        onClick={() => likeABlog(blog._id)}
                      >
                        {blog.isLiked ? (
                          <img src={filledHeart}></img>
                        ) : (
                          <img src={outLinedHeart}></img>
                        )}
                      </span>
                      <span className="like">{blog.like}</span>
                    </div>
                    <div>
                      <button
                        className="view-more"
                        onClick={() => {
                          handleCardClick(blog._id);
                        }}
                      >
                        View More
                      </button>
                    </div>
                    <div className="align-items-center">
                      {pageDetails == "mypost" && (
                        <>
                          <Button
                            icon="pi pi-pen-to-square p-2"
                            rounded
                            text
                            style={{ fontSize: "1.3rem" }}
                            onClick={() => editPost(blog)}
                          ></Button>
                          <Button
                            icon="pi pi-trash p-2 red"
                            style={{ fontSize: "1.3rem" }}
                            rounded
                            text
                            severity="danger"
                            onClick={() =>
                              setdeleteDialog({ visible: true, id: blog._id })
                            }
                          ></Button>
                        </>
                      )}
                      <Button
                        icon={
                          blog.isBookmarked
                            ? "pi pi-bookmark-fill"
                            : "pi pi-bookmark"
                        }
                        onClick={() => handleBookmark(blog._id)}
                        rounded
                        text
                        severity="info"
                        aria-label="Bookmark"
                      />
                    </div>
                  </div>
                </div>
                <div className="blog-section__image">
                  <div className="background-image"></div>
                  <img
                    src={"http://localhost:8080/" + blog.imageUrl}
                    alt="Image"
                  />
                </div>
              </section>
            </div>
          );
        })}
   
      <div className="blog-card">
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>Heading 7</h2>
            <p>
              Description for the third section. This text will be on the right
              side with the image on the left.Morbi ac eros eu elit volutpat
              dictum. Donec ac elit et nisi interdum pretium a nec dolor.
              Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id
              in libero. Nam consectetur urna at orci cursus, at venenatis
              sapien varius.Morbi ac eros eu elit volutpat dictum. Donec ac elit
              et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla
              at dolor ut urna vehicula ultricies id in libero. Nam consectetur
              urna at orci cursus, at venenatis sapien varius.
            </p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img
              src="https://cdn-ffcgi.nitrocdn.com/ZhDYBbXPoHrCHvLPGOdQmXKAjZXwoPng/assets/images/optimized/rev-bea8d4d/jamesmaherphotography.com/wp-content/uploads/2020/01/City-Urban-landscape-Photography-26.jpg"
              alt="Image 3"
            />
          </div>
        </section>
      </div>

      <div className="blog-card">
        <section className="blog-section blog-section--reverse">
          <div className="blog-section__content">
            <h2>Heading 8</h2>
            <p>
              Description for the second section. This text will be on the left
              side with the image on the right.Morbi ac eros eu elit volutpat
              dictum. Donec ac elit et nisi interdum pretium a nec dolor.
              Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id
              in libero. Nam consectetur urna at orci cursus, at venenatis
              sapien varius.Morbi ac eros eu elit volutpat dictum.interdum
              pretium a nec dolor.Nam consectetur urna at orci cursus, at
              venenatis sapien varius.
            </p>
            <div className="blog-section__footer">
              <button className="view-more">View More</button>
              <button className="heart-button">
                <FaHeart />
              </button>
              <button className="bookmark-button">
                <FaBookmark />
              </button>
            </div>
          </div>
          <div className="blog-section__image">
            <div className="background-image"></div>
            <img
              src="https://wallpapers.com/images/hd/lakeside-car-full-desktop-screen-hd-ffduevjvagzqhrhy.jpg"
              alt="Image 2"
            />
          </div>
        </section>
      </div>

      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalPages}
          //  rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={deleteDialog.visible}
        message="Are you sure you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteBlog}
        reject={() => setdeleteDialog({ visible: false, id: null })}
      />
    </div>
  );
};

export default Blog;
