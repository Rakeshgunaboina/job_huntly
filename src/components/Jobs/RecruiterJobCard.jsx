import React from 'react';
import './RecruiterJobs.scss';

const RecruiterJobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="recruiter-job-card">
      <div className="card-body">
        <h3>{job.title}</h3>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> £{job.salary}/hr</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <div className="card-actions">
          <button onClick={() => onEdit(job)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobCard;