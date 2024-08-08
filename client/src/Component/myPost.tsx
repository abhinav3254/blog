import "../Styles/blog.scss";
import Blog from "./blog";
const MyPost = () => {
  const userId = localStorage.getItem("userId") || "";

  return (
    <>
      <div><h3>My Posts</h3></div>
      <Blog  pageDetails="mypost"></Blog>
    </>
  );
};

export default MyPost;
