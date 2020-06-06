import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';

import { I18n } from 'react-redux-i18n';

import './style.scss';

const customStyles = {
  menu: () => {},
  control: () => {},
  singleValue: () => {},
  option: () => {},
  input: () => {},
};

export default function DropdownOption(props) {
  const [value, setValue] = useState(null);
  const [isActive, setActive] = useState(false);
  const {
    wrapperClassName,
    selectClassName,
    textClassName,
    message,
    name,
    options,
    error,
    curValue,
    disabled,
    isClearable,
  } = props;

  useEffect(() => {
    setValue(curValue);
  }, [curValue]);

  const prefix = error ? 'dropdown-error' : 'dropdown';

  const onFocus = () => setActive(true);
  const onBlur = () => setActive(false);
  const onChange = obj => {
    props.onChange(obj);
    setValue(obj);
  };

  return (
    <div
      className={classNames(`dropdown ${wrapperClassName}`, {
        dropdown_error: error,
      })}
    >
      <p
        className={classNames(`dropdown__text ${textClassName}`, {
          dropdown__text_active: isActive,
        })}
      >
        {message}
      </p>
      <Select
        className={`dropdown__select-options ${selectClassName}`}
        classNamePrefix={prefix}
        placeholder={I18n.t('components.filter.default-select-message')}
        isClearable={isClearable}
        isSearchable
        name={name}
        options={options}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        styles={customStyles}
        noOptionsMessage={() => I18n.t('components.filter.no-options-message')}
        value={value}
        isDisabled={disabled}
      />
    </div>
  );
}

DropdownOption.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  curValue: PropTypes.shape({
    label: PropTypes.string,
  }),
  wrapperClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  textClassName: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isClearable: PropTypes.bool,
};

DropdownOption.defaultProps = {
  curValue: null,
  wrapperClassName: '',
  selectClassName: '',
  textClassName: '',
  message: '',
  error: false,
  disabled: false,
  onChange: () => {},
  isClearable: true,
};
