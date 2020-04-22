import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { updateEvent } from 'src/actions/event/eventUtility';

import './style.scss';

const intervals = [
  { value: 'NONE', label: I18n.t('pages.classroom.occupation.intervals.none') },
  { value: 'EVERY_WEEK', label: I18n.t('pages.classroom.occupation.intervals.every') },
  { value: 'EACH_EVEN_WEEK', label: I18n.t('pages.classroom.occupation.intervals.even') },
  { value: 'EACH_ODD_WEEK', label: I18n.t('pages.classroom.occupation.intervals.odd') },
];

function findTime(item) {
  return this === item.id;
}

function TimeAndIntervalSelector(props) {
  const { timeBlocks, timeBlockId, updateEvent: updateEventAction, interval, isFree, date } = props;
  const [times, setTimes] = useState(null);

  useEffect(() => {
    setTimes(timeBlocks.find(findTime, timeBlockId));
  }, [timeBlockId, timeBlocks]);

  const onChangeInterval = obj => {
    const newInterval = obj && obj.value;
    let newEvent = { interval: newInterval };
    if (newInterval && newInterval === 'NONE') {
      newEvent = {
        ...newEvent,
        dateFrom: date,
        dateTo: date,
      };
    }
    updateEventAction(newEvent);
  };

  return (
    <div className="time-and-interval">
      <FieldWithLabel
        labelValue={I18n.t('pages.classroom.occupation.time')}
        classNameLabel="simple-label"
        classNameField="event-menu__input base-field simple-label__input"
        classNameText="simple-label__text"
        value={`${times ? times.timeFrom : ''} - ${times ? times.timeTo : ''}`}
        disabled
      />
      <DropdownOption
        name="interval"
        message={I18n.t('pages.classroom.occupation.interval')}
        options={intervals}
        wrapperClassName="event-menu__small-wrapper"
        textClassName="simple-label__text"
        selectClassName="event-menu__drop-down-select"
        onChange={onChangeInterval}
        curValue={intervals.find(item => item.value === interval)}
        disabled={!isFree}
      />
    </div>
  );
}

TimeAndIntervalSelector.propTypes = {
  timeBlockId: PropTypes.number,
  interval: PropTypes.string,
  date: PropTypes.string,
  timeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      timeFrom: PropTypes.string,
      timeTo: PropTypes.string,
    })
  ),
  updateEvent: PropTypes.func,
  isFree: PropTypes.bool.isRequired,
};

TimeAndIntervalSelector.defaultProps = {
  timeBlockId: -1,
  interval: '',
  date: '',
  timeBlocks: [],
  updateEvent: () => {},
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  timeBlockId: state.eventReducer.event.timeBlockId,
  isFree: state.eventReducer.isFree,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndIntervalSelector);
