import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import './style.scss';

export default function Spinner(props) {
  const { wrapperClassName, color, disable } = props;

  return (
    !disable && (
      <div className={`spinner-wrapper ${wrapperClassName}`}>
        <Loader type="TailSpin" color={color} height={80} width={80} />
      </div>
    )
  );
}

Spinner.propTypes = {
  wrapperClassName: PropTypes.string,
  color: PropTypes.string,
  disable: PropTypes.bool,
};

Spinner.defaultProps = {
  wrapperClassName: '',
  color: '#388e3d',
  disable: true,
};
