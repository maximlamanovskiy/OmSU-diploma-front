import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Form(props) {
  const { className, onSubmit, children } = props;

  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.defaultProps = {
  className: '',
  onSubmit: () => {},
};

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};
