import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'src/components/atoms/button/Button';

import { occupyClassroomWithTime } from 'src/actions/utility/selectClassroom';

import './style.scss';

const hasTimeBlock = (periods, timeBlockId) =>
  periods.some(period => period.timeBlock.id === timeBlockId);

function TimeOccupationList(props) {
  const {
    events,
    timeBlocks,
    occupyClassroomWithTime: occupyClassroomWithTimeAction,
    id,
    date,
  } = props;

  const times = () =>
    timeBlocks.map((item, index) => {
      const dateEvents = events
        ? events.filter(event => hasTimeBlock(event.eventPeriods, item.id))
        : [];
      const timeFrom = item.timeFrom.length === 4 ? `0${item.timeFrom}` : item.timeFrom;
      const timeTo = item.timeTo.length === 4 ? `0${item.timeTo}` : item.timeTo;
      const periodClassName = dateEvents
        .reduce(
          (className, dateEvent) =>
            `${className} ${dateEvent.eventPeriods.reduce(
              (cN, eventPeriod) => `${cN} ${eventPeriod.interval}`,
              ''
            )}`,
          ''
        )
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();

      return (
        <li key={item.id} className="list-occupations__list-item">
          <Button
            className={classNames(
              `list-occupations__occupation`,
              periodClassName,
              { 'list-occupations__occupation_free': dateEvents.length === 0 },
              { 'list-occupations__occupation_occupied': dateEvents.length !== 0 }
            )}
            value={`${timeFrom} - ${timeTo}`}
            onClick={() => occupyClassroomWithTimeAction(id, date, index)}
          />
        </li>
      );
    });

  return <ul className="list-occupations list">{times()}</ul>;
}

TimeOccupationList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  occupyClassroomWithTime: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
});

const mapDispatchToProps = dispatch => ({
  occupyClassroomWithTime: bindActionCreators(occupyClassroomWithTime, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeOccupationList);
