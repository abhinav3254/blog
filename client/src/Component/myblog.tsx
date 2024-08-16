import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputTextarea } from "primereact/inputtextarea";
import { Menu } from "primereact/menu";
import { Paginator } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { addComment, deleteComment, getBlogById, updateComment } from "../Services/blog";
import "../Styles/myblog.scss"; // Import your custom styles

const MyBlog = () => {
  const [visible, setVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<any>();
  const [editCommentId, seteditCommentId] = useState<any>();

  const footerContent = (
    <div className="dialog-footer">
      <Button
        label="LIKE"
        icon="pi pi-heart"
        onClick={() => setVisible(false)}
        autoFocus
      />
      <Button
        label="DELETE"
        icon="pi pi-trash"
        onClick={() => setVisible(false)}
      />
    </div>
  );
  const location = useLocation();
  const getBlog = () => {
    const { id } = location.state || {};
    if (id) {
      getBlogById(id)
        .then((res: any) => {
          setCurrentBlog(res.data);
          setTotalPages(res.data.comments.length / 5);
          setcurrentPageData(res.data.comments.slice(first, first + 5));
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  const handleDelete = (id: any) => {
    deleteComment(id)
      .then((res: any) => {
        getBlog();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleCommentEdit = (id: any,text:any) => {
    setComment(text)
    seteditCommentId(id)

  };
  const Comment = ({ key, id, user, text }: any) => {
 const userId = localStorage.getItem("userId")
    const menuLeft: any = useRef(null);
    const items=(id:any,text:any) =>  [
      {
        label: "Edit",
        icon: "pi pi-pen-to-square",
        command: () => handleCommentEdit(id,text),
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => handleDelete(id),
      },
    ];
    return (
      <div className="comment">
        <div className="comment-content">
          <div className="inline-flex align-items-center justify-content-between gap-2 w-12">
            <div className="inline-flex align-items-center">
              <Avatar
                image={"http://localhost:8080/" + user.profilePicture}
                imageFallback="https://bootdey.com/img/Content/avatar/avatar7.png"
                shape="circle"
              />
              <span className="font-bold ml-2">{user.username}</span>
            </div>
            <div>
              {userId==user._id&&<><Menu
                model={items(id,text)}
                popup
                ref={menuLeft}
                id={`popup_menu_left_${id}`} 
              />
              <Button
                icon="pi pi-ellipsis-v"
                rounded
                text
                severity="success"
                aria-label="menu"
                onClick={(event) => menuLeft.current.toggle(event)}
              /></>}
            </div>
          </div>
          <div className="cmntText">{text}</div>
        </div>
      </div>
    );
  };
  const [comment, setComment] = useState("");
  const [currentPageData, setcurrentPageData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(1);
  const [newComment, setNewComment] = useState({
    username: "",
    profilePic: "",
    text: "",
  });
  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    currentBlog?.comments &&
      setcurrentPageData(
        currentBlog.comments.slice(event.page * 5, event.page * 5 + 5)
      );
  };
  const sendComment = () => {
    if (!comment) {
      return;
    }
    let Data = {
      comment: comment,
    };
    if(editCommentId!=null){
      updateComment(editCommentId, Data)
        .then((res: any) => {
          seteditCommentId(null)
          setComment('')
          getBlog();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }else{
      addComment(currentBlog._id, Data)
        .then((res: any) => {
          setComment('')
          getBlog();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

  };

  return (
    <>
      {currentBlog ? (
        <>
          <div className="my-blog">
            <div className="my-blog__image">
              <img
                src={"http://localhost:8080/" + currentBlog.imageUrl}
                alt="Image"
              />
            </div>
            <div className="my-blog__content">
              <h1 className="my-blog__title">{currentBlog?.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: currentBlog?.content }} />
            </div>
            <div className="comments-section">
              <h2>Comments</h2>
              {currentPageData.map((item: any) => (
                <Comment
                  key={item._id}
                  id={item._id}
                  user={item.user}
                  text={item.comment}
                />
              ))}
              <form className="comment-form">
                <IconField iconPosition="right">
                  <InputTextarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    autoResize
                  />
                  <InputIcon
                    className="pi pi-send"
                    disabled={comment == ""}
                    onClick={(e) => sendComment()}
                  >
                    {" "}
                  </InputIcon>
                </IconField>
              </form>
              <div className="card">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalPages}
                  onPageChange={onPageChange}
                  template={{
                    layout: "PrevPageLink CurrentPageReport NextPageLink",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-blog">
            <div className="my-blog__image">
              <img
                src="https://media-www.sqspcdn.com/images/pages/homepage/aug-2023/grow-your-business/designed-to-sell/designed-to-sell-2-1500w.webp"
                alt="Blog Image"
              />
            </div>
            <div className="my-blog__content">
              <h1 className="my-blog__title">SUMMER SALE</h1>
              <p className="my-blog__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                interdum lorem ut ligula placerat, in dictum purus efficitur.
                Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus
                ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et
                velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat.
                Sed sit amet vehicula leo.
              </p>
              <p className="my-blog__description">
                Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi
                interdum pretium a nec dolor. Suspendisse potenti. Nulla at
                dolor ut urna vehicula ultricies id in libero. Nam consectetur
                urna at orci cursus, at venenatis sapien varius.
              </p>
              <p className="my-blog__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                interdum lorem ut ligula placerat, in dictum purus efficitur.
                Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus
                ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et
                velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat.
                Sed sit amet vehicula leo.
              </p>
              <p className="my-blog__description">
                Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi
                interdum pretium a nec dolor. Suspendisse potenti. Nulla at
                dolor ut urna vehicula ultricies id in libero. Nam consectetur
                urna at orci cursus, at venenatis sapien varius.
              </p>
              <p className="my-blog__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                interdum lorem ut ligula placerat, in dictum purus efficitur.
                Phasellus at condimentum felis. Nulla facilisi. Sed vitae risus
                ac mauris feugiat tincidunt a id odio. Fusce accumsan enim et
                velit feugiat, et ultricies nisl auctor. Aliquam erat volutpat.
                Sed sit amet vehicula leo.
              </p>
              <p className="my-blog__description">
                Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi
                interdum pretium a nec dolor. Suspendisse potenti. Nulla at
                dolor ut urna vehicula ultricies id in libero. Nam consectetur
                urna at orci cursus, at venenatis sapien varius.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyBlog;
