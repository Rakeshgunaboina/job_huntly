import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import '../../styles/components/_auth.scss';

const Registration = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError('');
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join JobHuntly</h2>
          <p>Create your account to start your job search</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <AuthForm 
          isLogin={false} 
          onSubmit={handleSubmit} 
          loading={isLoading} 
        />

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
          <p className="auth-terms">
            By registering, you agree to our{' '}
            <Link to="/terms" className="auth-link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="auth-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-hero">
        <div className="hero-content">
          <h3>Student-focused job platform</h3>
          <p>
            Find jobs that respect your 20-hour work limit and academic schedule
          </p>
          <ul className="hero-features">
            <li>NI-compliant job listings</li>
            <li>Peer recommendations</li>
            <li>Work hour tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Registration;