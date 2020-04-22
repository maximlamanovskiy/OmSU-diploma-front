import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { clearEvent, updateEvent, changeIsFree } from 'src/actions/event/eventUtility';

import './style.scss';

function isOccupiedFunc(item) {
  return item.timeBlock.id === this.id;
}

function TimeButtons(props) {
  const [selected, changeSelected] = useState(-1);

  const { timeBlocks, events, isFree } = props;

  const clickHandler = (index, isOccupied) => () => {
    if (isFree === isOccupied) {
      props.clearEvent();
    }

    if (selected !== index) {
      changeSelected(index);
      props.changeIsFree(!isOccupied);
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
      props.updateEvent(newEvent);
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
              { 'time-buttons__button_occupy': index !== selected && isOccupied },
              { 'time-buttons__button_free': index !== selected && !isOccupied }
            )}
            value={`${item.timeFrom}\n${item.timeTo}`}
            onClick={clickHandler(index, isOccupied)}
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
  updateEvent: PropTypes.func,
  changeIsFree: PropTypes.func,
  clearEvent: PropTypes.func,
  isFree: PropTypes.bool.isRequired,
};

TimeButtons.defaultProps = {
  timeBlocks: [],
  events: [],
  updateEvent: () => {},
  changeIsFree: () => {},
  clearEvent: () => {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
  isFree: state.eventReducer.isFree,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
  clearEvent: bindActionCreators(clearEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeButtons);
