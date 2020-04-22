import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Button(props) {
  const { className, value, disabled, onClick, children } = props;

  return (
    <button className={`button ${className}`} disabled={disabled} onClick={onClick} type="submit">
      {value}
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: '',
  value: '',
  disabled: false,
  onClick: () => {},
  children: null,
};
