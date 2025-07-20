import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${
        disabled ? 'disabled' : ''
      } ${loading ? 'loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="loader-wrapper">
          <span className="loader" />
        </span>
      )}
      {startIcon && !loading && <span className="icon start-icon">{startIcon}</span>}
      <span className="button-content">{children}</span>
      {endIcon && !loading && <span className="icon end-icon">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;