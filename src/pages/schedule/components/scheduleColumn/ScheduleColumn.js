import React from 'react';
import PropTypes from 'prop-types';

import LessonCompact from '../lessonCompact/LessonCompact';
import TimeBlockInfo from '../timeBlockInfo/TimeBlockInfo';

import './style.scss';

export default function ScheduleColumn(props) {
  const { schedule, timeBlocks, number } = props;
  const columnStyle = {
    gridColumn: `${number}/${number}`,
  };

  let i = 0;
  const renderDay = () =>
    timeBlocks.map((timeBlock, index) => {
      const lessons = schedule ? schedule[timeBlock.timeFrom] : null;
      i += 1;
      return (
        <div
          key={i}
          className="schedule-column__lesson-cell"
          style={{
            ...columnStyle,
            gridRow: `${index + 2}/${index + 2}`,
          }}
        >
          {lessons && lessons.map(lesson => <LessonCompact lesson={lesson} key={`${lesson.id}`} />)}
        </div>
      );
    });

  const renderTimeBlocks = () =>
    timeBlocks &&
    timeBlocks.map(timeBlock => <TimeBlockInfo timeBlock={timeBlock} key={timeBlock.id} />);

  return (
    <React.Fragment>
      {!schedule && timeBlocks && renderTimeBlocks()}
      {schedule && timeBlocks && renderDay()}
    </React.Fragment>
  );
}

ScheduleColumn.propTypes = {
  timeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      timeTo: PropTypes.string,
      timeFrom: PropTypes.string,
    })
  ),
  schedule: PropTypes.shape({}),
  number: PropTypes.number,
};

ScheduleColumn.defaultProps = {
  timeBlocks: null,
  schedule: null,
  number: 1,
};
