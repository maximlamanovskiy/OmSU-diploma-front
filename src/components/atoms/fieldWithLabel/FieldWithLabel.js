import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export default function FiledWithLabel(props) {
  const [isActive, setActive] = useState(false);

  const {
    classNameLabel,
    classNameField,
    classNameText,
    value,
    type,
    name,
    placeholder,
    onChange,
    hasError,
    disabled,
    labelValue,
    hasErrorMessage,
    id,
  } = props;

  const onFocus = () => {
    setActive(true);
  };

  const onBlur = () => {
    props.onBlur();
    setActive(false);
  };

  return (
    <label
      className={classNames(`label-block ${classNameLabel}`, {
        'label-block_error': hasError,
        'label-block_with-error-message': hasErrorMessage,
        'label-block_active': isActive,
      })}
      htmlFor={id}
    >
      <p
        className={classNames(`label-block__text ${classNameText}`, {
          'label-block__text_active': isActive,
        })}
      >
        {labelValue}
      </p>
      <input
        className={classNames(`field label-block__field ${classNameField}`, {
          'label-block__field_error': hasError,
        })}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
        id={id}
      />
    </label>
  );
}

FiledWithLabel.propTypes = {
  classNameLabel: PropTypes.string,
  classNameField: PropTypes.string,
  classNameText: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  labelValue: PropTypes.string,
  hasErrorMessage: PropTypes.bool,
  id: PropTypes.string,
  onBlur: PropTypes.func,
};

FiledWithLabel.defaultProps = {
  classNameLabel: '',
  classNameField: '',
  classNameText: '',
  value: '',
  type: 'text',
  name: '',
  placeholder: '',
  hasError: false,
  disabled: false,
  labelValue: '',
  hasErrorMessage: false,
  id: null,
  onBlur: () => {},
  onChange: () => {},
};
