import { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockJobs = [
      {
        id: '1',
        title: 'Retail Assistant',
        company: 'SuperStore',
        location: 'London',
        type: 'Part-time',
        hoursPerWeek: 20,
        salary: 10.50,
        description: 'Customer service role in busy retail environment',
        companyLogo: null
      },
      // Add more mock jobs as needed
    ];
    
    setJobs(mockJobs);
    setLoading(false);
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  return useContext(JobContext);
}