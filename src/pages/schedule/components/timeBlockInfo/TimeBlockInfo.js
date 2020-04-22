import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function TimeBlockInfo(props) {
  const { timeBlock } = props;

  return (
    <div className="time-block-info">
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
  }),
};

TimeBlockInfo.defaultProps = {
  timeBlock: {},
};
