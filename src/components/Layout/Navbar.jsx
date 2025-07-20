import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo-link">
            <span className="logo-icon">💼</span>
            <span className="logo-text">JobHuntly</span>
          </Link>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link 
              to="/jobs" 
              className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/resources" 
              className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>

          <div className="auth-links">
            {currentUser ? (
              <div className="user-menu">
                <Link 
                  to="/dashboard" 
                  className="dashboard-link"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="login-link"
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="register-link"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;