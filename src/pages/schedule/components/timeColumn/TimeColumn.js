import React from 'react';
import PropTypes from 'prop-types';

import TimeBlockInfo from '../timeBlockInfo/TimeBlockInfo';

import './style.scss';

export default function TimeColumn(props) {
  const { timeBlocks, count } = props;

  const renderTimeBlocks = () => {
    const res = [];
    for (let i = 0; i < count && timeBlocks; i += 1) {
      res.push(
        timeBlocks.map((timeBlock, index) => (
          <TimeBlockInfo
            timeBlock={timeBlock}
            key={timeBlock.id}
            className={count > 1 ? 'time-block-info_second' : ''}
            position={i * timeBlocks.length + index + 2}
          />
        ))
      );
    }
    return res;
  };

  return <React.Fragment>{renderTimeBlocks()}</React.Fragment>;
}

TimeColumn.propTypes = {
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  count: PropTypes.number,
};

TimeColumn.defaultProps = {
  count: 1,
};
