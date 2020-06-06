import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import Button from 'src/components/atoms/button/Button';

import { selectClassroom } from 'src/actions/classrooms/utility';
import { selectTime, changeIsFree } from 'src/actions/event/eventUtility';

import * as paths from 'src/constants/paths';

import './style.scss';

const hasTimeBlock = (periods, timeBlockId) =>
  periods.some(period => period.timeBlock.id === timeBlockId);

function TimeOccupationList(props) {
  const { timeBlocks, id } = props;

  const onClick = (index, isFree) => {
    props.selectClassroom(id);
    props.selectTime(index);
    props.changeIsFree(isFree);
    props.historyPush(`${paths.classroom}`);
  };

  const events = props.events[id];

  const times = () =>
    timeBlocks.map((item, index) => {
      const dateEvents = events
        ? events.filter(event => hasTimeBlock(event.eventPeriods, item.id))
        : [];
      const { timeFrom, timeTo } = item;
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
            onClick={() => onClick(index, dateEvents.length === 0)}
          />
        </li>
      );
    });

  return <ul className="list-occupations list">{times()}</ul>;
}

TimeOccupationList.propTypes = {
  events: PropTypes.shape({}),
  id: PropTypes.number.isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectClassroom: PropTypes.func.isRequired,
  selectTime: PropTypes.func.isRequired,
  changeIsFree: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
};

TimeOccupationList.defaultProps = {
  events: {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.classroomEvents,
});

const mapDispatchToProps = dispatch => ({
  selectClassroom: bindActionCreators(selectClassroom, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
  historyPush: bindActionCreators(push, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeOccupationList);
