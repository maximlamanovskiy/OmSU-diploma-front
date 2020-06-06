import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { updateReschedule } from 'src/actions/utility/reschedule';
import { millisecondsInDay } from 'src/utils/date';

import './style.scss';

function periodsComparator(first, second) {
  if (first.date.localeCompare(second.date) !== 0) {
    return first.date.localeCompare(second.date);
  }
  if (first.timeFrom.localeCompare(second.timeFrom) !== 0) {
    return first.timeFrom.localeCompare(second.timeFrom);
  }
  if (first.timeTo.localeCompare(second.timeTo) !== 0) {
    return first.timeTo.localeCompare(second.timeTo);
  }
  return first.classroom.localeCompare(second.classroom);
}

function EventDate(props) {
  const { dates, reschedule, updateReschedule: updateRescheduleAction } = props;
  const now = Date.now();

  const handleClick = period =>
    updateRescheduleAction({
      period: reschedule.period === period ? null : period,
      from: reschedule.period === period ? null : period.date,
    });

  const renderPeriods = () =>
    dates.sort(periodsComparator).map(period => (
      <li
        className="event-date__list-element"
        key={`${period.date} ${period.classroom} ${period.timeFrom}`}
      >
        <Button
          className={classNames('event-date__button', {
            'event-date__button_selected': reschedule.period === period,
            'event-date__button_past': now - new Date(period.date).getTime() > millisecondsInDay,
          })}
          onClick={() => handleClick(period)}
        >
          <span>{period.date}</span>
          <span>{period.classroom}</span>
          <span>{`${period.timeFrom}/${period.timeTo}`}</span>
        </Button>
      </li>
    ));

  return (
    <div className="event-date">
      <ul className="event-date__button-list">{renderPeriods()}</ul>
    </div>
  );
}

EventDate.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.shape({})),
  reschedule: PropTypes.shape({
    from: PropTypes.string,
    period: PropTypes.shape({}),
  }),
  updateReschedule: PropTypes.func,
};

EventDate.defaultProps = {
  dates: [],
  reschedule: {},
  updateReschedule: () => {},
};

const mapStateToProps = state => ({
  reschedule: state.rescheduleReducer.reschedule,
  dates: state.eventReducer.fullEvent.dates,
});

const mapDispatchToProps = dispatch => ({
  updateReschedule: bindActionCreators(updateReschedule, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDate);
