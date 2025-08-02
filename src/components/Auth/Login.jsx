import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';
import '../../styles/components/_auth.scss';

const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      setIsLoading(true);
      setError('');
      const user = await login(email, password);

      // Redirect based on role
      if (user.user_type === 'recruiter') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back to JobHuntly</h2>
          <p>Log in to find your next part-time opportunity</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <AuthForm 
          isLogin={true} 
          onSubmit={handleSubmit} 
          loading={isLoading} 
        />

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
          {/* Forgot password link removed */}
        </div>
      </div>

      <div className="auth-hero">
        <div className="hero-content">
          <h3>Find NI-compliant part-time jobs</h3>
          <p>
            Connect with verified employers and stay within your visa work limits
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
