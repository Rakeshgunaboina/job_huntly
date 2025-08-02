import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ import context
import './Dashboard.scss';

const StudentDashboard = () => {
  const [applicationCount, setApplicationCount] = useState(0);
  const { currentUser } = useAuth(); // ✅ get logged-in user

  useEffect(() => {
    if (!currentUser?.id) return;

    fetch(`http://localhost:5000/job_huntly/applications/count?userId=${currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        setApplicationCount(data.count || 0);
      })
      .catch(err => {
        console.error('Error fetching application count:', err);
      });
  }, [currentUser]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, Student!</h1>
      <p>You have applied to <strong>{applicationCount}</strong> job{applicationCount !== 1 ? 's' : ''}.</p>

      <div className="dashboard-actions">
        <Link to="/jobs" className="dashboard-btn">
          Browse Jobs
        </Link>
        {/* <Link to="/my-applications" className="dashboard-btn">
          My Applications
        </Link> */}
      </div>
    </div>
  );
};

export default StudentDashboard;
