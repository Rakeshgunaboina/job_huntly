import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <Button
            variant="primary"
            size="large"
            as={Link}
            to="/"
            className="home-button"
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="large"
            as={Link}
            to="/jobs"
            className="jobs-button"
          >
            Browse Jobs
          </Button>
        </div>
        <div className="error-image">
          <svg
            viewBox="0 0 500 300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M50,150 C100,50 400,50 450,150 C400,250 100,250 50,150 Z"
              fill="#f0f4ff"
            />
            <circle cx="150" cy="120" r="30" fill="#4a6bdf" opacity="0.8" />
            <circle cx="350" cy="120" r="30" fill="#4a6bdf" opacity="0.8" />
            <path
              d="M150,180 Q250,220 350,180"
              stroke="#4a6bdf"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;