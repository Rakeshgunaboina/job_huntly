import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Recruiter.scss';

const PostJob = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '', company: '', location: '',
    type: 'Part-time', hours_per_week: '', salary: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const job = { ...formData, user_id: currentUser?.id };
    const res = await fetch('http://localhost:5000/job_huntly/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    const result = await res.json();
    if (!res.ok) return setMessage(result.error || 'Failed to post');
    setMessage('Job posted successfully');
    setFormData({ title: '', company: '', location: '', type: 'Part-time', hours_per_week: '', salary: '', description: '' });
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      {message && <p className="status">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option>Part-time</option><option>Full-time</option><option>Internship</option>
        </select>
        <input name="hours_per_week" type="number" placeholder="Hours/Week" value={formData.hours_per_week} onChange={handleChange} required />
        <input name="salary" type="number" placeholder="Salary (£/hr)" value={formData.salary} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;