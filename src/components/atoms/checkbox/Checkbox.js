import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export default function Checkbox(props) {
  const { id, text, value, onChange, disabled } = props;

  return (
    <label
      className={classNames('checkbox-wrapper', {
        'checkbox-wrapper_disabled': disabled,
      })}
      htmlFor={id}
    >
      <input
        className="checkbox-wrapper__checkbox-input"
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox-wrapper__checkbox" />
      <p className="checkbox-wrapper__text">{text}</p>
    </label>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  text: '',
  value: false,
  disabled: false,
  onChange: () => {},
};
