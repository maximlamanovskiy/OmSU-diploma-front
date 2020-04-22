import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Field(props) {
  const { className, value, type, name, placeholder, disabled, onChange, onBlur, onFocus } = props;

  return (
    <input
      className={`field ${className}`}
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}

Field.defaultProps = {
  className: '',
  value: '',
  type: 'text',
  name: '',
  placeholder: '',
  disabled: false,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

Field.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};
