import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Recruiter.scss';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', company: '', location: '',
    type: 'Part-time', hours_per_week: '', salary: '',
    description: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/job_huntly/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setFormData(data);
        } else {
          setStatus('Job not found');
        }
      })
      .catch(() => setStatus('Error loading job data'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/job_huntly/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await res.json();
    if (!res.ok) {
      setStatus(result.error || 'Update failed');
    } else {
      setStatus('Job updated successfully');
      setTimeout(() => navigate('/manage-jobs'), 1500);
    }
  };

  return (
    <div className="post-job-container">
      <h2>Edit Job</h2>
      {status && <p className="status">{status}</p>}
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
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;