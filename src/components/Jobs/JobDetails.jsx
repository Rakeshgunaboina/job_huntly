import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './JobDetails.scss';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/job_huntly/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching job:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading job details...</div>;
  if (!job) return <div className="error">Job not found</div>;

  return (
    <div className="job-details-container">
      <Link to="/jobs" className="back-link">← Back to Jobs</Link>

      <div className="job-details-card">
        <h1>{job.title}</h1>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.type}</p>
        <p><strong>Hours per Week:</strong> {job.hours_per_week}</p>
        <p><strong>Salary:</strong> £{job.salary}/hr</p>
        <p><strong>Description:</strong></p>
        <p>{job.description}</p>

        <Link to={`/jobs/${id}/apply`} className="apply-btn">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
