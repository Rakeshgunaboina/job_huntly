import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import { useAuth } from '../context/AuthContext';
import RecruiterJobCard from '../components/Jobs/RecruiterJobCard';
import '../styles/Recruiter.scss';

const ManageJobs = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  // Fetch jobs by recruiter ID
  const fetchJobs = () => {
    if (!currentUser?.id) return;
    fetch(`http://localhost:5000/job_huntly/recruiter/jobs?userId=${currentUser.id}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Failed to fetch jobs', err));
  };

  useEffect(() => {
    fetchJobs();
  }, [currentUser]);

  // Delete job
  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    const res = await fetch(`http://localhost:5000/job_huntly/jobs/${jobId}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (res.ok) {
      fetchJobs(); // refresh list
    } else {
      alert(result.error || 'Delete failed');
    }
  };

  // Navigate to edit page
  const handleEdit = (job) => {
    setEditingJob(job);
    navigate(`/edit-job/${job.id}`);
  };

  return (
    <div className="manage-jobs-container">
      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map(job => (
          <RecruiterJobCard
            key={job.id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default ManageJobs;
