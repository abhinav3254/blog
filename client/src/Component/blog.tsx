import React from 'react';
import '../Styles/blog.scss';
import { FaBookmark, FaHeart } from 'react-icons/fa';

const Blog = () => {
  const handleCardClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="blog">
      <div className="blog-card" onClick={() => handleCardClick('/path/to/detail/page1')}>
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>Heading 1</h2>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
            <p> Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
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
            <img src="https://www.brandignity.com/wp-content/uploads/2020/12/digital-marketing-photography.jpg" alt="Image 1" />
          </div>
        </section>
      </div>

      <div className="blog-card" onClick={() => handleCardClick('/path/to/detail/page2')}>
        <section className="blog-section blog-section--reverse">
          <div className="blog-section__content">
            <h2>Heading 2</h2>
            <p>Description for the second section. This text will be on the left side with the image on the right.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.Morbi ac eros eu elit volutpat dictum.interdum pretium a nec dolor.Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
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
            <img src="https://cdn-ffcgi.nitrocdn.com/ZhDYBbXPoHrCHvLPGOdQmXKAjZXwoPng/assets/images/optimized/rev-bea8d4d/jamesmaherphotography.com/wp-content/uploads/2020/01/City-Urban-landscape-Photography-25.jpg" alt="Image 2" />
          </div>
        </section>
      </div>

      <div className="blog-card" onClick={() => handleCardClick('/path/to/detail/page3')}>
        <section className="blog-section">
          <div className="blog-section__content">
            <h2>Heading 3</h2>
            <p>Description for the third section. This text will be on the right side with the image on the left.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.Morbi ac eros eu elit volutpat dictum. Donec ac elit et nisi interdum pretium a nec dolor. Suspendisse potenti. Nulla at dolor ut urna vehicula ultricies id in libero. Nam consectetur urna at orci cursus, at venenatis sapien varius.</p>
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
            <img src="https://cdn-ffcgi.nitrocdn.com/ZhDYBbXPoHrCHvLPGOdQmXKAjZXwoPng/assets/images/optimized/rev-bea8d4d/jamesmaherphotography.com/wp-content/uploads/2020/01/City-Urban-landscape-Photography-26.jpg" alt="Image 3" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
