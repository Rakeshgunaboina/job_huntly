import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = ({ size = 'medium', variant = 'primary', className = '' }) => {
  return (
    <div className={`loader-container ${size} ${variant} ${className}`}>
      <div className="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
  className: PropTypes.string,
};

export default Loader;