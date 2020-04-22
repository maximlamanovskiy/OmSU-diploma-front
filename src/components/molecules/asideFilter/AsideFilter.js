import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from 'src/components/atoms/button/Button';

import './style.scss';

export default function AsideFilter(props) {
  const {
    filterClassName,
    isClose,
    buttonClassName,
    buttonValue,
    buttonDisabled,
    onClick,
    children,
  } = props;

  return (
    <aside
      className={classNames(`filter ${filterClassName}`, {
        filter_close: isClose,
      })}
    >
      {children}
      <Button
        className={`filter__apply-filter action-button ${buttonClassName}`}
        onClick={onClick}
        value={buttonValue}
        disabled={buttonDisabled}
      />
    </aside>
  );
}

AsideFilter.propTypes = {
  filterClassName: PropTypes.string,
  isClose: PropTypes.bool,
  buttonClassName: PropTypes.string,
  buttonValue: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

AsideFilter.defaultProps = {
  filterClassName: '',
  isClose: false,
  buttonClassName: '',
  buttonValue: '',
  buttonDisabled: false,
  onClick: () => {},
};
