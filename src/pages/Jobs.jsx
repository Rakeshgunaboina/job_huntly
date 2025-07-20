import React from 'react';
import JobCard from '../components/Jobs/JobCard';
import { useJobContext } from '../context/JobContext';

const Jobs = () => {
  const { jobs, loading } = useJobContext();

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>
      <div className="jobs-list">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;