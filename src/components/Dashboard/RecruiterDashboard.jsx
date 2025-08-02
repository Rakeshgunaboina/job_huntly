import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.scss';

const RecruiterDashboard = () => {
  const [jobCount, setJobCount] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.id) return;

    fetch(`http://localhost:5000/job_huntly/recruiter/jobs/count?userId=${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        setJobCount(data.count || 0);
      })
      .catch(err => {
        console.error('Error fetching job count:', err);
      });
  }, [currentUser]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, Recruiter!</h1>
      <p>You have posted <strong>{jobCount}</strong> job{jobCount !== 1 ? 's' : ''}.</p>

      <div className="dashboard-actions">
        <Link to="/post-job" className="dashboard-btn">
          Post a New Job
        </Link>
        <Link to="/manage-jobs" className="dashboard-btn">
          Manage Jobs
        </Link>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
