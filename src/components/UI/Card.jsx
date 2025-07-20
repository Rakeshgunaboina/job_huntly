import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

const Card = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`card ${variant} ${padding} ${
        hoverEffect ? 'hover-effect' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['elevated', 'outline', 'filled']),
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  hoverEffect: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;