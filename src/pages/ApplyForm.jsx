import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ApplyForm.scss';

const ApplyForm = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    cv: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('coverLetter', formData.coverLetter);
    form.append('cv', formData.cv);

    // ✅ Add userId from currentUser
    if (currentUser?.id) {
      form.append('userId', currentUser.id);
    } else {
      setError('You must be logged in to apply.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/job_huntly/jobs/${id}/apply`, {
        method: 'POST',
        body: form
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      setMessage(result.message || 'Application submitted successfully');
      setFormData({ name: '', email: '', coverLetter: '', cv: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-form-container">
      <h2>Apply for this Job</h2>
      {error && <div className="error-msg">{error}</div>}
      {message && <div className="success-msg">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Cover Letter</label>
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Upload CV</label>
          <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} required />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Apply Now'}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
