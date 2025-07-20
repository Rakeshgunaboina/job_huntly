import React from 'react';
import { motion } from 'framer-motion';
import './MilestoneTimeline.scss';

const MilestoneTimeline = ({ milestones }) => {
  return (
    <div className="timeline">
      {milestones.map((milestone, index) => (
        <motion.div 
          key={index}
          className="timeline-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="timeline-year">{milestone.year}</div>
            <h3 className="timeline-title">{milestone.title}</h3>
            <p className="timeline-description">{milestone.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MilestoneTimeline;