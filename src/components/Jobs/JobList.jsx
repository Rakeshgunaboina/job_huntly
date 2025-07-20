import { useState, useEffect, useContext } from 'react';
import JobCard from './JobCard';
import Filters from './Filters';
import { JobContext } from '../../context/JobContext';
import Loader from '../UI/Loader';
import './JobList.scss';

const JobList = () => {
  const { jobs, loading, error } = useContext(JobContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    location: '',
    hours: '',
    salaryRange: [0, 50],
    niCompliant: false
  });

  useEffect(() => {
    if (jobs) {
      let result = [...jobs];
      
      // Apply search filter
      if (filters.search) {
        result = result.filter(job => 
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Apply job type filter
      if (filters.jobType) {
        result = result.filter(job => job.type === filters.jobType);
      }
      
      // Apply location filter
      if (filters.location) {
        result = result.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      // Apply hours filter
      if (filters.hours) {
        if (filters.hours === 'under10') {
          result = result.filter(job => job.hoursPerWeek <= 10);
        } else if (filters.hours === '10to20') {
          result = result.filter(job => job.hoursPerWeek > 10 && job.hoursPerWeek <= 20);
        }
      }
      
      // Apply salary filter
      result = result.filter(job => 
        job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1]
      );
      
      // Apply NI compliance filter
      if (filters.niCompliant) {
        result = result.filter(job => job.niCompliant);
      }
      
      setFilteredJobs(result);
    }
  }, [jobs, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="job-list-container">
      <Filters filters={filters} onChange={handleFilterChange} />
      
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="no-results">
            <h3>No jobs found matching your criteria</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;