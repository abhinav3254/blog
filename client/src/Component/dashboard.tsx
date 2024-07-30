import React from 'react';
import '../Styles/dashboard.scss'; // Ensure this path is correct for your project
import { SassColor } from 'sass';

const Dashboard: React.FC = () => {
  return (
    <div id="dashboard" className="dashboard">
      {/* Hero Block */}
      <div id="hero-block" className="hero-block">
        <div className="hero-background">
          <div className="hero-background__image hero-background__image--bottom">
            <picture>
              <source type="image/jpeg" srcSet="https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-100w.jpg 100w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-300w.jpg 300w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-500w.jpg 500w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-750w.jpg 750w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-1000w.jpg 1000w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-1500w.jpg 1500w, https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-2500w.jpg 2500w" />
              <img decoding="async" src="https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/background-desktop-500w.jpg" alt="Background Image" />
            </picture>
          </div>
          <div className="hero-background__image hero-background__image--top">
            <picture>
              <img decoding="async" src="https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/foreground-desktop-500w.jpg" alt="Foreground Image" />
            </picture>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-content__text">
            <div className="breadcrumbs" vocab="https://schema.org/" typeof="BreadcrumbList">
              <div className="hero-content__heading">
                <h1>Create a blog</h1>
                <p>
                  Share your story with the world. Create a beautiful, personalized blog that fits your brand. Grow your audience with built-in marketing tools, or transform your passion into revenue by gating access with a paywall.
                </p>
                <a className="link link--is-button" href="/templates" aria-label="Get Started">
                  <span className="link__text">Get Started</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-content__image">
            <picture>
              <img decoding="async" src="https://media-www.sqspcdn.com/images/pages/tour/blogs/hero/foreground-desktop-500w.jpg" alt="Content Image" />
            </picture>
          </div>
        </div>
      </div>


      <div className="hero-block">
        <div className="hero-content">
          <div className="hero-content__text">
            <h1>Another Section</h1>
            <p>
              This is another section with similar styling to the hero block. You can add more content here.
            </p>
          </div>
          <div className="hero-content__image">
            <picture>
              <img decoding="async" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7M-9V0tqjA7rwWDXgepN4utediuJ3Mab8eA&s" alt="Another Image" />
            </picture>
          </div>
          <div className="hero-content__image">
            <picture>
              <img decoding="async" src="https://backlightblog.com/images/2021/04/travel-photography-header.jpg" alt="Another Image" />
            </picture>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <h1>Our Blog</h1>
      <div className="cards-section">
        <div className="card">
          <img decoding="async" src="https://colorlib.com/wp/wp-content/uploads/sites/2/7_food-blog-designs.jpg" alt="Card Image" />
          <div className="card-content">
            <h2>Card Title 1</h2>
            <p>This is a description for card 1.</p>
          </div>
        </div>
        <div className="card">
          <img decoding="async" src="https://marketplace.canva.com/EAE6WTyrSQ0/2/0/1600w/canva-light-beige-sleek-and-simple-blogger-personal-website--7Q4-7tyJj4.jpg" alt="Card Image" />
          <div className="card-content">
            <h2>Card Title 2</h2>
            <p>This is a description for card 2.</p>
          </div>
        </div>
        <div className="card">
          <img decoding="async" src="https://images-wixmp-530a50041672c69d335ba4cf.wixmp.com/templates/image/cffd601d8f00029e894a9dfaf14824e9fb8717b6bd9bcdc617fdbc6a419454a21628613679481.jpg" alt="Card Image" />
          <div className="card-content">
            <h2>Card Title 3</h2>
            <p>This is a description for card 3.</p>
          </div>
        </div>
        <div className="card">
          <img decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Eastcampusfire_glog_crop.png/220px-Eastcampusfire_glog_crop.png" alt="Card Image" />
          <div className="card-content">
            <h2>Card Title 4</h2>
            <p>This is a description for card 4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
