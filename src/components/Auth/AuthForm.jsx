import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';
import './AuthForm.scss';

const AuthForm = ({ isLogin, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    firstName: '',
    lastName: '',
    address: '',
    mobileNo: '',
    userType: 'student'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isLogin) {
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.userName) newErrors.userName = 'Username is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.mobileNo) newErrors.mobileNo = 'Mobile number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const submission = {
    userName: formData.userName,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    address: formData.address,
    mobileNo: formData.mobileNo,
    userType: formData.userType
  };

  if (isLogin) {
    onSubmit(formData.email, formData.password); // ✅ pass as separate args
  } else {
    onSubmit(submission); // ✅ full object for registration
  }
};


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.api && <div className="error-message">{errors.api}</div>}

      {!isLogin && (
        <>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </>
      )}

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {!isLogin && (
        <>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Mobile No</label>
            <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
            {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
          </div>

          <div className="form-group">
            <label>I am a</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={formData.userType === 'student'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="recruiter"
                  checked={formData.userType === 'recruiter'}
                  onChange={handleChange}
                />
                Recruiter
              </label>
            </div>
          </div>
        </>
      )}

      <Button type="submit" disabled={loading} className="primary">
        {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;
