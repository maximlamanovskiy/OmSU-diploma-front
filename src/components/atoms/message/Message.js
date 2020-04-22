import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Message(props) {
  const { className, value } = props;

  return <p className={`message ${className}`}>{value}</p>;
}

Message.defaultProps = {
  className: '',
  value: '',
};

Message.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
};
