import React from 'react';
import PropTypes from 'prop-types';

import LessonCompact from '../lessonCompact/LessonCompact';

import './style.scss';

export default function ScheduleColumn(props) {
  const { schedule, timeBlocks, number, isCourses, dayOfWeeks } = props;
  const columnStyle = {
    gridColumn: `${number}/${number}`,
  };

  let i = 0;
  const renderScheduleTimeBlocks = () =>
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

  const renderScheduleTimeOfDays = (dayLessons, index, length) =>
    timeBlocks.map((time, ind) => {
      const lessons = dayLessons ? dayLessons[time.timeFrom] : null;
      i += 1;
      return (
        <div
          key={i}
          className="schedule-column__lesson-cell"
          style={{
            gridRow: `${index * length + ind + 2}/${index * length + ind + 2}`,
          }}
        >
          {lessons && lessons.map(lesson => <LessonCompact lesson={lesson} key={`${lesson.id}`} />)}
        </div>
      );
    });

  const renderScheduleDays = () =>
    dayOfWeeks.map((day, index) =>
      renderScheduleTimeOfDays(schedule ? schedule.schedule[day] : null, index, timeBlocks.length)
    );

  return (
    <React.Fragment>
      {!isCourses && schedule && timeBlocks && renderScheduleTimeBlocks()}
      {isCourses && schedule && timeBlocks && renderScheduleDays()}
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
  isCourses: PropTypes.bool,
  schedule: PropTypes.shape({
    schedule: PropTypes.shape({}),
  }),
  number: PropTypes.number,
  dayOfWeeks: PropTypes.arrayOf(PropTypes.string),
};

ScheduleColumn.defaultProps = {
  timeBlocks: null,
  schedule: null,
  number: 1,
  isCourses: false,
  dayOfWeeks: [],
};
