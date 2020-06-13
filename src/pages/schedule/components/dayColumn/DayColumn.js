import React from 'react';
import PropTypes from 'prop-types';

import DayInfo from '../dayInfo/DayInfo';

import './style.scss';

export default function DayColumn(props) {
  const { dayOfWeeks, timeBlocks } = props;

  const renderDays = () =>
    dayOfWeeks &&
    dayOfWeeks.map((day, index) => (
      <DayInfo
        key={day}
        day={day}
        start={index * timeBlocks.length + 2}
        end={index * timeBlocks.length + timeBlocks.length + 2}
      />
    ));

  return <React.Fragment>{renderDays()}</React.Fragment>;
}

DayColumn.propTypes = {
  dayOfWeeks: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
