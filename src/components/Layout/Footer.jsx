import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="logo-link">
            <span className="logo-icon">💼</span>
            <span className="logo-text">JobHuntly</span>
          </Link>
          <p className="tagline">
            Connecting students with compliant part-time opportunities
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">
              <span className="icon">🐦</span>
            </a>
            <a href="#" aria-label="Facebook">
              <span className="icon">📘</span>
            </a>
            <a href="#" aria-label="LinkedIn">
              <span className="icon">🔗</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span className="icon">📸</span>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="links-column">
            <h4>For Students</h4>
            <Link to="/jobs">Find Jobs</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/work-hours">Work Hour Tracker</Link>
            <Link to="/student-guide">Student Guide</Link>
          </div>

          <div className="links-column">
            <h4>For Employers</h4>
            <Link to="/post-job">Post a Job</Link>
            <Link to="/recruiter-dashboard">Recruiter Dashboard</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/employer-guide">Employer Guide</Link>
          </div>

          <div className="links-column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/careers">Careers</Link>
          </div>

          <div className="links-column">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/compliance">Compliance</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {new Date().getFullYear()} JobHuntly. All rights reserved.
        </div>
        <div className="footer-misc">
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;