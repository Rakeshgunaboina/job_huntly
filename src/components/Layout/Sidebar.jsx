import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.scss';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '→' : '←'}
      </button>

      <div className="sidebar-content">
        <div className="user-profile">
          <div className="avatar">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <h4>{currentUser?.name || 'User'}</h4>
              <p>{currentUser?.userType === 'student' ? 'Student' : 'Recruiter'}</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <span className="icon">📊</span>
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link 
            to="/jobs" 
            className={`nav-item ${location.pathname === '/jobs' ? 'active' : ''}`}
          >
            <span className="icon">🔍</span>
            {!isCollapsed && <span>Job Search</span>}
          </Link>

          {currentUser?.userType === 'student' ? (
            <>
              <Link 
                to="/saved-jobs" 
                className={`nav-item ${location.pathname === '/saved-jobs' ? 'active' : ''}`}
              >
                <span className="icon">❤️</span>
                {!isCollapsed && <span>Saved Jobs</span>}
              </Link>
              <Link 
                to="/applications" 
                className={`nav-item ${location.pathname === '/applications' ? 'active' : ''}`}
              >
                <span className="icon">📝</span>
                {!isCollapsed && <span>Applications</span>}
              </Link>
              <Link 
                to="/work-hours" 
                className={`nav-item ${location.pathname === '/work-hours' ? 'active' : ''}`}
              >
                <span className="icon">⏱️</span>
                {!isCollapsed && <span>Work Hours</span>}
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/post-job" 
                className={`nav-item ${location.pathname === '/post-job' ? 'active' : ''}`}
              >
                <span className="icon">➕</span>
                {!isCollapsed && <span>Post Job</span>}
              </Link>
              <Link 
                to="/manage-jobs" 
                className={`nav-item ${location.pathname === '/manage-jobs' ? 'active' : ''}`}
              >
                <span className="icon">📋</span>
                {!isCollapsed && <span>Manage Jobs</span>}
              </Link>
              <Link 
                to="/candidates" 
                className={`nav-item ${location.pathname === '/candidates' ? 'active' : ''}`}
              >
                <span className="icon">👥</span>
                {!isCollapsed && <span>Candidates</span>}
              </Link>
            </>
          )}

          <div className="divider"></div>

          <Link 
            to="/settings" 
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <span className="icon">⚙️</span>
            {!isCollapsed && <span>Settings</span>}
          </Link>
          <Link 
            to="/help" 
            className={`nav-item ${location.pathname === '/help' ? 'active' : ''}`}
          >
            <span className="icon">❓</span>
            {!isCollapsed && <span>Help</span>}
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;