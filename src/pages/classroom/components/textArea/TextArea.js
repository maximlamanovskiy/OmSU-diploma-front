import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export default function TextArea(props) {
  const [isActive, setIsActive] = useState(false);

  const {
    wrapperClassName,
    headerClassName,
    headerValue,
    textClassName,
    textName,
    textValue,
    textOnChange,
    textOnBlur,
    disabled,
  } = props;

  const onFocus = () => setIsActive(true);
  const onBlur = () => {
    setIsActive(false);
    textOnBlur();
  };

  return (
    <div className={`text-area ${wrapperClassName}`}>
      <p
        className={classNames(`text-area__text ${headerClassName}`, {
          'text-area__text_active': isActive,
        })}
      >
        {headerValue}
      </p>
      <textarea
        className={`text-area__input ${textClassName}`}
        name={textName}
        value={textValue}
        onChange={textOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  headerValue: PropTypes.string,
  textClassName: PropTypes.string,
  textName: PropTypes.string,
  textValue: PropTypes.string,
  textOnChange: PropTypes.func,
  textOnBlur: PropTypes.func,
};

TextArea.defaultProps = {
  disabled: false,
  wrapperClassName: '',
  headerClassName: '',
  headerValue: '',
  textClassName: '',
  textName: '',
  textValue: '',
  textOnChange: () => {},
  textOnBlur: () => {},
};
