import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import Checkbox from 'src/components/atoms/checkbox/Checkbox';
import TextArea from 'src/components/atoms/textArea/TextArea';
import DateRangeSelector from 'src/components/molecules/dateRangeSelector/DateRangeSelector';

import { updateEvent, selectEvent, selectTime, changeIsFree } from 'src/actions/event/eventUtility';
import { getLecturersFetch } from 'src/actions/lecturers/getLecturers';
import { intervalsValue, isOccupiedFunc } from 'src/utils/date';

import TimeAndIntervalSelector from '../timeAndIntervalSelector/TimeAndIntervalSelector';

import './style.scss';

function EventMenu(props) {
  const {
    eventProp,
    getLecturers,
    lecturers,
    isFree,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    error,
    events,
    timeIndex,
    timeBlocks,
    updateEvent: updateEventAction,
    selectEvent: selectEventAction,
    selectTime: selectTimeAction,
    changeIsFree: changeIsFreeAction,
    interval,
    setInterval,
  } = props;

  const selectedEvent = !isFree
    ? events.find(event => event.eventPeriods.some(isOccupiedFunc, timeBlocks[timeIndex]))
    : null;
  const selectedDate = selectedEvent
    ? selectedEvent.eventPeriods.find(isOccupiedFunc, timeBlocks[timeIndex])
    : {};
  const currentLecturer = lecturers.find(
    lec =>
      lec.id === (!isFree && !!selectedEvent ? selectedEvent.lecturer.id : eventProp.lecturerId)
  );

  useEffect(() => {
    getLecturers();
  }, [getLecturers]);

  useEffect(() => {
    selectEventAction(selectedEvent ? selectedEvent.id : -1);
  }, [selectEventAction, selectedEvent]);

  const clearTime = () => {
    changeIsFreeAction(true);
    selectTimeAction(-1);
  };

  const updateDate = newDate => {
    clearTime();
    setDateFrom(newDate);
    setDateTo(newDate);
    updateEventAction({ dateFrom: newDate, dateTo: newDate });
  };
  const updateDateFrom = newDateFrom => {
    clearTime();
    setDateFrom(newDateFrom);
    updateEventAction({ dateFrom: newDateFrom });
  };
  const updateDateTo = newDateTo => {
    clearTime();
    setDateTo(newDateTo);
    updateEventAction({ dateTo: newDateTo });
  };
  const handleChangeInComment = event => updateEventAction({ comment: event.target.value });
  const handleChangeInLecturer = obj => updateEventAction({ lecturerId: obj ? obj.value : -1 });
  const handleChangeInDate = event => updateDate(event.target.value);
  const handleChangeInRequired = () => updateEventAction({ required: !eventProp.required });

  return (
    <section className="event-menu">
      <TimeAndIntervalSelector
        interval={!isFree && !!selectedDate ? selectedDate.interval : interval}
        error={isFree && error}
        timeIndex={timeIndex}
        setInterval={setInterval}
      />
      {(isFree && interval !== intervalsValue[0]) ||
      (!isFree && selectedDate.interval !== intervalsValue[0]) ? (
        <DateRangeSelector
          dateFrom={!isFree && !!selectedDate ? selectedDate.dateFrom : dateFrom}
          dateTo={!isFree && !!selectedDate ? selectedDate.dateTo : dateTo}
          updateDateFrom={updateDateFrom}
          updateDateTo={updateDateTo}
          disabled={!isFree}
        />
      ) : (
        <FieldWithLabel
          labelValue={I18n.t('components.labels.date')}
          classNameLabel="simple-label simple-label_full"
          classNameField="date-range__date-picker base-field simple-label__input"
          classNameText="simple-label__text"
          type="date"
          value={!isFree && !!selectedDate ? selectedDate.dateFrom : dateFrom}
          onChange={handleChangeInDate}
        />
      )}
      <DropdownOption
        name="lecturer"
        message={I18n.t('components.labels.lecturer')}
        options={lecturers}
        wrapperClassName="event-menu__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="event-menu__drop-down-select"
        onChange={handleChangeInLecturer}
        curValue={currentLecturer}
        disabled={!isFree}
        error={isFree && !currentLecturer && error}
      />
      <TextArea
        wrapperClassName="simple-label simple-label_full"
        headerClassName="simple-label__text"
        headerValue={I18n.t('components.labels.comment')}
        textClassName="event-menu__input base-field base-field__text simple-label__input event-menu__textarea"
        textName="comment"
        textValue={!isFree && !!selectedEvent ? selectedEvent.comment : eventProp.comment}
        textOnChange={handleChangeInComment}
        disabled={!isFree}
      />
      <Checkbox
        id="required"
        text={I18n.t('components.labels.require')}
        value={!isFree && !!selectedEvent ? selectedEvent.required : eventProp.required}
        onChange={handleChangeInRequired}
        disabled={!isFree}
      />
    </section>
  );
}

EventMenu.propTypes = {
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  timeIndex: PropTypes.number.isRequired,
  eventProp: PropTypes.shape({
    comment: PropTypes.string,
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
    interval: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    lecturerId: PropTypes.number,
    required: PropTypes.bool,
  }).isRequired,
  lecturers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateEvent: PropTypes.func.isRequired,
  getLecturers: PropTypes.func.isRequired,
  setDateFrom: PropTypes.func.isRequired,
  setDateTo: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  selectTime: PropTypes.func.isRequired,
  changeIsFree: PropTypes.func.isRequired,
  setInterval: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  timeIndex: state.eventReducer.timeIndex,
  eventProp: state.eventReducer.event,
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
  isFree: state.eventReducer.isFree,
  lecturers: state.lecturersReducer.lecturers,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
  getLecturers: bindActionCreators(getLecturersFetch, dispatch),
  selectEvent: bindActionCreators(selectEvent, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMenu);
