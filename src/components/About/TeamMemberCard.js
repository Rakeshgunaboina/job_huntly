import React from 'react';
import { motion } from 'framer-motion';
import './TeamMemberCard.scss';

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div 
      className="team-member-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="member-image">
        <img src={member.image} alt={member.name} />
        <div className="social-links">
          {member.social.linkedin && (
            <a href={member.social.linkedin} aria-label={`${member.name} LinkedIn`}>
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} aria-label={`${member.name} Twitter`}>
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} aria-label={`${member.name} GitHub`}>
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <p className="bio">{member.bio}</p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;