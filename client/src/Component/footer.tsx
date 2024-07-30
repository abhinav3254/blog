import React from 'react';
import '../Styles/footer.scss'; // Ensure this path is correct for your project

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <img src="path/to/logo.svg" alt="Blog Logo" />
        </div>
        <div className="footer__links">
          <a href="/about" className="footer__link">About</a>
          <a href="/contact" className="footer__link">Contact</a>
          <a href="/privacy" className="footer__link">Privacy Policy</a>
          <a href="/terms" className="footer__link">Terms of Service</a>
        </div>
        <div className="footer__social">
          <a href="https://facebook.com" className="footer__social-link" aria-label="Facebook">
            <img src="path/to/facebook-icon.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" className="footer__social-link" aria-label="Twitter">
            <img src="path/to/twitter-icon.svg" alt="Twitter" />
          </a>
          <a href="https://instagram.com" className="footer__social-link" aria-label="Instagram">
            <img src="path/to/instagram-icon.svg" alt="Instagram" />
          </a>
        </div>
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
