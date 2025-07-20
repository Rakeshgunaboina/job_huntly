import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeamMemberCard from '../components/About/TeamMemberCard';
import MilestoneTimeline from '../components/About/MilestoneTimeline';
import './About.scss';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [videoPlaying, setVideoPlaying] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Former international student with first-hand experience of job hunting challenges',
      image: '/images/team/alex.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Tech enthusiast focused on building accessible platforms for students',
      image: '/images/team/sarah.jpg',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    // Add more team members
  ];

  const milestones = [
    {
      year: 2020,
      title: 'Founded',
      description: 'Concept developed during university hackathon'
    },
    {
      year: 2021,
      title: 'Beta Launch',
      description: 'First 1000 student users onboarded'
    },
    // Add more milestones
  ];

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span>JobHuntly</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Revolutionizing student employment through technology and community
          </motion.p>
        </div>
        <div className="hero-image">
          {videoPlaying ? (
            <div className="video-container">
              <iframe
                title="About JobHuntly"
                src="https://www.youtube.com/embed/your-video-id?autoplay=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="video-placeholder" onClick={toggleVideo}>
              <img src="/images/about-hero.jpg" alt="JobHuntly team" />
              <button className="play-button">
                <i className="fas fa-play"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tabs Navigation */}
      <nav className="about-tabs">
        <button 
          className={activeTab === 'mission' ? 'active' : ''}
          onClick={() => setActiveTab('mission')}
        >
          Our Mission
        </button>
        <button 
          className={activeTab === 'story' ? 'active' : ''}
          onClick={() => setActiveTab('story')}
        >
          Our Story
        </button>
        <button 
          className={activeTab === 'values' ? 'active' : ''}
          onClick={() => setActiveTab('values')}
        >
          Our Values
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'mission' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mission-section"
          >
            <h2>Empowering Student Success</h2>
            <div className="mission-stats">
              <div className="stat-card">
                <h3>10,000+</h3>
                <p>Students Connected</p>
              </div>
              <div className="stat-card">
                <h3>95%</h3>
                <p>Visa Compliance Rate</p>
              </div>
              <div className="stat-card">
                <h3>4.8/5</h3>
                <p>Student Satisfaction</p>
              </div>
            </div>
            <p className="mission-statement">
              JobHuntly was born from a simple idea: students shouldn't have to 
              choose between academic success and financial stability. Our platform 
              bridges the gap between education and employment by providing 
              vetted, flexible opportunities that respect visa regulations and 
              academic calendars.
            </p>
            <div className="mission-features">
              <div className="feature-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Visa-Safe</h3>
                <p>All jobs comply with international student work regulations</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-clock"></i>
                <h3>Flexible</h3>
                <p>Opportunities that fit around your study schedule</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>Community</h3>
                <p>Peer reviews and recommendations you can trust</p>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'story' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="story-section"
          >
            <h2>From Dorm Room to Global Platform</h2>
            <MilestoneTimeline milestones={milestones} />
            <div className="founder-story">
              <div className="founder-image">
                <img src="/images/founder.jpg" alt="Founder" />
              </div>
              <div className="founder-quote">
                <blockquote>
                  "As an international student, I struggled to find work that 
                  respected my visa restrictions. JobHuntly was created to solve 
                  this problem for students everywhere."
                </blockquote>
                <p>- Alex Johnson, Founder</p>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'values' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="values-section"
          >
            <h2>What We Stand For</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Education First</h3>
                <p>We prioritize academic success above all else</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Integrity</h3>
                <p>Transparent and ethical in all we do</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Inclusivity</h3>
                <p>Supporting students from all backgrounds</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Innovation</h3>
                <p>Constantly improving our platform</p>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet The Team</h2>
        <p className="section-subtitle">
          Passionate individuals dedicated to student success
        </p>
        <div className="team-grid">
          {teamMembers.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Transform Your Student Work Experience?</h2>
        <div className="cta-buttons">
          <button className="btn-primary">
            Join Now
          </button>
          <button className="btn-secondary">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;