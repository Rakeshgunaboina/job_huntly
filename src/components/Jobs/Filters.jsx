import { useState } from 'react';
import './Filters.scss';

const Filters = ({ filters, onChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSalaryChange = (e, index) => {
    const newSalaryRange = [...filters.salaryRange];
    newSalaryRange[index] = parseInt(e.target.value);
    onChange({ salaryRange: newSalaryRange });
  };

  return (
    <div className="filters-container">
      <div className="basic-filters">
        <div className="filter-group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Search jobs, companies, keywords"
          />
        </div>
        
        <div className="filter-group">
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleInputChange}
          >
            <option value="">All Job Types</option>
            <option value="part-time">Part Time</option>
            <option value="full-time">Full Time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>
        
        <div className="filter-group">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Location"
          />
        </div>
        
        <button
          type="button"
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>
      
      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Hours per Week</label>
            <select
              name="hours"
              value={filters.hours}
              onChange={handleInputChange}
            >
              <option value="">Any</option>
              <option value="under10">Under 10 hours</option>
              <option value="10to20">10-20 hours</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Salary Range (£/hr)</label>
            <div className="range-slider">
              <input
                type="range"
                min="0"
                max="50"
                value={filters.salaryRange[0]}
                onChange={(e) => handleSalaryChange(e, 0)}
              />
              <input
                type="range"
                min="0"
                max="50"
                value={filters.salaryRange[1]}
                onChange={(e) => handleSalaryChange(e, 1)}
              />
              <div className="range-values">
                <span>£{filters.salaryRange[0]}</span>
                <span>£{filters.salaryRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group checkbox">
            <label>
              <input
                type="checkbox"
                name="niCompliant"
                checked={filters.niCompliant}
                onChange={handleInputChange}
              />
              NI Compliant Only
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;