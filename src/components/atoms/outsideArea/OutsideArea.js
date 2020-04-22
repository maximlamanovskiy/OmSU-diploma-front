import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

export default function OutsideArea(props) {
  const { className, onClick, isOpen } = props;

  const [isDisplayed, setDisplayed] = useState(false);
  const [isHide, setHide] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isOpen) {
      timeout = setTimeout(() => setDisplayed(false), 500);
      setHide(false);
      return () => {
        clearTimeout(timeout);
      };
    }
    timeout = setTimeout(() => setHide(true), 10);
    setDisplayed(true);
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <button
      className={classNames(`outside-area ${className}`, {
        'outside-area_hide': !isHide,
        'outside-area_not-displayed': !isDisplayed,
      })}
      onClick={isOpen ? onClick : () => {}}
      type="button"
    />
  );
}

OutsideArea.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

OutsideArea.defaultProps = {
  className: '',
  isOpen: false,
  onClick: () => {},
};
