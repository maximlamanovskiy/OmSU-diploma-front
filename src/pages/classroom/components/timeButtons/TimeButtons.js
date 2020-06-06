import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { updateEvent, changeIsFree, selectTime } from 'src/actions/event/eventUtility';
import { isOccupiedFunc } from 'src/utils/date';

import './style.scss';

function TimeButtons(props) {
  const {
    timeBlocks,
    events,
    timeIndex,
    eventTimeIndex,
    changeIsFree: changeIsFreeAction,
    updateEvent: updateEventAction,
    selectTime: selectTimeAction,
  } = props;

  useEffect(() => {
    if (
      timeBlocks &&
      timeIndex !== -1 &&
      !events.some(event => event.eventPeriods.some(isOccupiedFunc, timeBlocks[timeIndex]))
    ) {
      updateEventAction({ timeBlockId: timeBlocks[timeIndex].id, timeIndex });
    }
    if (timeIndex === -1) {
      updateEventAction({ timeBlockId: -1, timeIndex: -1 });
    }
  }, [timeBlocks, timeIndex, events, updateEventAction]);

  const clickHandler = (index, isOccupied) => {
    if (timeIndex !== index) {
      changeIsFreeAction(!isOccupied);
      selectTimeAction(index);
    }
    if (timeIndex === index && !isOccupied) {
      changeIsFreeAction(true);
      selectTimeAction(-1);
    }
    if (timeIndex === index && isOccupied) {
      changeIsFreeAction(true);
      selectTimeAction(eventTimeIndex);
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
              { 'time-buttons__button_free': index !== timeIndex && !isOccupied },
              {
                'time-buttons__button_prev':
                  index === eventTimeIndex && eventTimeIndex !== timeIndex,
              }
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
  eventTimeIndex: PropTypes.number,
  updateEvent: PropTypes.func,
  changeIsFree: PropTypes.func,
  selectTime: PropTypes.func,
};

TimeButtons.defaultProps = {
  timeBlocks: [],
  events: [],
  timeIndex: -1,
  eventTimeIndex: -1,
  updateEvent: () => {},
  changeIsFree: () => {},
  selectTime: () => {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
  timeIndex: state.eventReducer.timeIndex,
  eventTimeIndex: state.eventReducer.event.timeIndex,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeButtons);
