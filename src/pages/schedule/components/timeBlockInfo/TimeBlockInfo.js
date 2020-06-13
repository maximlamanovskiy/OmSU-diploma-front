import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function TimeBlockInfo(props) {
  const { timeBlock, className, position } = props;

  const style = position
    ? {
        gridRowStart: position,
      }
    : {};

  return (
    <div className={`time-block-info ${className}`} style={style}>
      <span className="time-block-info__text">{timeBlock.timeFrom}</span>
      <span className="time-block-info__delimiter">-</span>
      <span className="time-block-info__text">{timeBlock.timeTo}</span>
    </div>
  );
}

TimeBlockInfo.propTypes = {
  timeBlock: PropTypes.shape({
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  position: PropTypes.number,
};

TimeBlockInfo.defaultProps = {
  className: '',
  position: null,
};
