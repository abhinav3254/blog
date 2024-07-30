import { useEffect, useState } from 'react';
import { FaBookmark, FaComment, FaHeart, FaUserCircle } from 'react-icons/fa';
import { getBlogs } from '../Services/authService';
import '../Styles/blog.scss';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [blogs, setBlogs] = useState<any>([]);

useEffect(()=>{
  getBlogs().then((res:any)=>{
    console.log(res)
    setBlogs(res.data.blogs)
  })
},[])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="blog-container">
      {currentPosts.map((post:any) => (
        <div key={post._id} className="post-card">
          <div className="post-header">
            <h4 className='title'>{post.title}</h4>
            <div className='mentions'>Posted By
            <FaUserCircle className="user-icon" />
            <span>{post.author.username}</span>
            </div>
            
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-footer">
            <div className="post-actions">
              <FaHeart className="action-icon" />
              <FaComment className="action-icon" />
            </div>
            <FaBookmark className="bookmark-icon" />
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(blogs.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blog;
