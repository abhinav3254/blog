import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import filledHeart from "../assets/filled_heart.png";
import outLinedHeart from "../assets/outlined_heart.png";

import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component

import { useSelector } from "react-redux";
import {
  bookmarkBlog,
  deleteBlog,
  getBlogMyBlogs,
  getBlogs,
  getBookmarks,
  likeBlog,
  removeBookmark,
  searchBlogs,
} from "../Services/blog";
import "../Styles/blog.scss";
import { RootState } from "../store";

const Blog = (props: any) => {
  const { pageDetails } = props;
  const navigate = useNavigate();
  // const userId =  useSelector((state: RootState) => state.App.userId);
  const searchValue = useSelector((state: RootState) => state.App.searchValue);
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
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    getData();
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== "") {
        search();
      }else{
        getData();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [currentPage,searchValue]);

  const search = () => {
    searchBlogs(currentPage, searchValue)
      .then((res: any) => {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


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


  const getAllByIdBlogs = (id: any) => {
    getBlogMyBlogs(currentPage)
      .then((res: any) => {
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log("err", err);
      });
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
            <div className="blog-card">
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
                        className={pageDetails == "mypost" ? "view-more ml-8":"view-more"}
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
      <div className="card">
       {totalPages>0 ? <Paginator
          first={first}
          rows={rows}
          totalRecords={totalPages}
          //  rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />:
        <div className="NoBlog">No Blog Found !!!</div>
        }
      </div>
      <Toast ref={toast} />
      <ConfirmDialog
      className="deleteDialog"
        visible={deleteDialog.visible}
        message="Are you sure you want to delete?"
        header="Confirmation"
        closable={false}
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteBlog}
        reject={() => setdeleteDialog({ visible: false, id: null })}
      />
    </div>
  );
};

export default Blog;
