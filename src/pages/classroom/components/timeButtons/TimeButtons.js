import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { clearEvent, updateEvent, changeIsFree, selectTime } from 'src/actions/event/eventUtility';

import './style.scss';

function isOccupiedFunc(item) {
  return item.timeBlock.id === this.id;
}

function updateCurrentEvent(
  index,
  isOccupied,
  events,
  timeBlocks,
  changeIsFreeFunc,
  updateEventFunc
) {
  changeIsFreeFunc(!isOccupied);
  const event = events.find(item => item.eventPeriods.some(isOccupiedFunc, timeBlocks[index]));
  const period = event ? event.eventPeriods.find(isOccupiedFunc, timeBlocks[index]) : {};
  const newEvent = isOccupied
    ? {
        ...event,
        timeBlockId: timeBlocks[index].id,
        lecturerId: event.lecturer.id,
        interval: period.interval,
        dateFrom: period.dateFrom,
        dateTo: period.dateTo,
      }
    : {
        timeBlockId: timeBlocks[index].id,
      };
  updateEventFunc(newEvent);
}

function TimeButtons(props) {
  const {
    timeBlocks,
    events,
    timeIndex,
    isFree,
    clearEvent: clearEventAction,
    changeIsFree: changeIsFreeAction,
    updateEvent: updateEventAction,
    selectTime: selectTimeAction,
  } = props;

  useEffect(() => {
    if (timeIndex !== -1) {
      updateCurrentEvent(
        timeIndex,
        events.some(event => event.eventPeriods.some(isOccupiedFunc, timeBlocks[timeIndex])),
        events,
        timeBlocks,
        changeIsFreeAction,
        updateEventAction
      );
    }
  }, [timeIndex, events, timeBlocks, changeIsFreeAction, updateEventAction]);

  const clickHandler = (index, isOccupied) => {
    if (timeIndex !== index) {
      if (isFree === isOccupied) {
        clearEventAction();
      }
      selectTimeAction(index);
    }
  };

  const renderTimes = () =>
    timeBlocks.map((item, index) => {
      const isOccupied = events.some(event => event.eventPeriods.some(isOccupiedFunc, item));

      return (
        <li key={item.id} className="time-buttons__occupying-button">
          <Button
            className={classNames(
              `time-buttons__button time-buttons__button_selected`,
              { 'time-buttons__button_occupy': index !== timeIndex && isOccupied },
              { 'time-buttons__button_free': index !== timeIndex && !isOccupied }
            )}
            value={`${item.timeFrom}\n${item.timeTo}`}
            onClick={() => clickHandler(index, isOccupied)}
          />
        </li>
      );
    });

  return <ul className="time-buttons list">{renderTimes()}</ul>;
}

TimeButtons.propTypes = {
  timeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      timeFrom: PropTypes.string,
      timeTo: PropTypes.string,
    })
  ),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  timeIndex: PropTypes.number,
  isFree: PropTypes.bool,
  updateEvent: PropTypes.func,
  changeIsFree: PropTypes.func,
  clearEvent: PropTypes.func,
  selectTime: PropTypes.func,
};

TimeButtons.defaultProps = {
  timeBlocks: [],
  events: [],
  timeIndex: -1,
  isFree: true,
  updateEvent: () => {},
  changeIsFree: () => {},
  clearEvent: () => {},
  selectTime: () => {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
  isFree: state.eventReducer.isFree,
  timeIndex: state.eventReducer.timeIndex,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
  clearEvent: bindActionCreators(clearEvent, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeButtons);
