import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Header(props) {
  const { className, value } = props;

  return <h1 className={`header ${className}`}>{value}</h1>;
}

Header.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Header.defaultProps = {
  className: '',
};
