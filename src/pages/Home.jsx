import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobContext } from '../context/JobContext';
import JobCard from '../components/Jobs/JobCard';
import './Home.scss';

const Home = () => {
  const { currentUser } = useAuth();
  const { jobs, loading } = useJobContext();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    // Filter featured jobs (last 3 added)
    setFeaturedJobs(jobs.slice(0, 3));
  }, [jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call
    console.log('Searching for:', { searchQuery, locationFilter });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect <span>Part-Time</span> Job</h1>
          <p className="subtitle">
            Discover NI-compliant opportunities tailored for students
          </p>
          
          {/* Advanced Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Job title, keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <i className="fas fa-search"></i> Search Jobs
              </button>
            </div>
          </form>

          <div className="cta-buttons">
            {!currentUser ? (
              <>
                <Link to="/register" className="btn-primary">
                  <i className="fas fa-user-plus"></i> Join Now
                </Link>
                <Link to="/jobs" className="btn-secondary">
                  <i className="fas fa-briefcase"></i> Browse Jobs
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn-primary">
                <i className="fas fa-tachometer-alt"></i> Go to Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-illustration.svg" alt="Students working" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose JobHuntly?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Visa-Compliant</h3>
            <p>All jobs respect the 20-hour work limit for international students</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Verified Employers</h3>
            <p>Only legitimate opportunities from trusted companies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Peer Reviews</h3>
            <p>See what other students say about employers</p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {!loading && featuredJobs.length > 0 && (
        <section className="featured-jobs">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <Link to="/jobs" className="view-all">View All Jobs <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="jobs-grid">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial">
            <div className="quote">
              "Found a perfect job that fits my schedule and visa requirements!"
            </div>
            <div className="author">
              <img src="/images/student1.jpg" alt="Student" />
              <div>
                <h4>Sarah K.</h4>
                <p>Computer Science Student</p>
              </div>
            </div>
          </div>
          {/* More testimonials can be added here */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="final-cta">
        <h2>Ready to Find Your Perfect Job?</h2>
        <p>Join thousands of students who found their ideal part-time positions</p>
        {!currentUser ? (
          <Link to="/register" className="btn-primary btn-large">
            Get Started Now
          </Link>
        ) : (
          <Link to="/jobs" className="btn-primary btn-large">
            Browse Available Jobs
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;