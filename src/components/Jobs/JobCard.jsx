import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.scss';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-logo">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company} />
          ) : (
            <div className="logo-placeholder">
              {job.company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
          <p className="job-location">{job.location}</p>
        </div>
      </div>

      <div className="job-details">
        <div className="detail">
          <span className="label">Type:</span>
          <span className="value">{job.type}</span>
        </div>
        <div className="detail">
          <span className="label">Hours:</span>
          <span className="value">{job.hours_per_week} hrs/week</span>
        </div>
        <div className="detail">
          <span className="label">Salary:</span>
          <span className="value">£{job.salary}/hr</span>
        </div>
      </div>

      <div className="job-actions">
        <Link to={`/jobs/${job.id}`} className="view-btn">View Details</Link>
        <button className="save-btn">Save Job</button>
      </div>
    </div>
  );
};

export default JobCard;