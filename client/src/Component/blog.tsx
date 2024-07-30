import React, { useState } from 'react';
import '../Styles/blog.scss';
import { FaUserCircle, FaHeart, FaComment, FaBookmark } from 'react-icons/fa';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const posts = [
    { id: 1, user: 'User1', content: 'Content1' },
    { id: 2, user: 'User2', content: 'Content2' },
    { id: 3, user: 'User3', content: 'Content3' },
    { id: 4, user: 'User4', content: 'Content4' },
    { id: 5, user: 'User5', content: 'Content5' },
    { id: 6, user: 'User6', content: 'Content6' },
    { id: 7, user: 'User7', content: 'Content7' },
    { id: 8, user: 'User8', content: 'Content8' },
    { id: 9, user: 'User9', content: 'Content9' },
    { id: 10, user: 'User10', content: 'Content10' },
    { id: 11, user: 'User11', content: 'Content11' },
    { id: 12, user: 'User12', content: 'Content12' },
    { id: 13, user: 'User13', content: 'Content13' },
    { id: 14, user: 'User14', content: 'Content14' },
  ];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="blog-container">
      {currentPosts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <FaUserCircle className="user-icon" />
            <span>{post.user}</span>
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
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
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
