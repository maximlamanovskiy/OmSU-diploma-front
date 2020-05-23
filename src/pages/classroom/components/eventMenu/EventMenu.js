import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import Checkbox from 'src/components/atoms/checkbox/Checkbox';

import { updateEvent } from 'src/actions/event/eventUtility';
import { getLecturersFetch } from 'src/actions/lecturers/getLecturers';
import { getClassroomWithEventsFetch } from 'src/actions/classrooms/getClassroomWithEvents';

import EditableTextInfoBlock from '../textArea/TextArea';
import DateRangeSelector from '../dateRangeSelector/DateRangeSelector';
import TimeAndIntervalSelector from '../timeAndIntervalSelector/TimeAndIntervalSelector';

import './style.scss';

function EventMenu(props) {
  const {
    updateEvent: updateEventAction,
    eventProp,
    getLecturers,
    lecturers,
    isFree,
    getClassroomWithEvents,
    selectedClassroomId,
  } = props;

  const [comment, changeComment] = useState('');
  const [curDate, setCurDate] = useState(props.date);

  const error = props.error && props.hasError;

  useEffect(() => {
    changeComment(eventProp.comment);
  }, [eventProp]);

  useEffect(() => {
    getLecturers();
  }, [getLecturers]);

  const updateDate = date => {
    getClassroomWithEvents(selectedClassroomId, date);
    setCurDate(date);
  };
  const handleChangeInComment = event => changeComment(event.target.value);
  const onBlurComment = () => updateEventAction({ comment });
  const handleChangeInLecturer = obj => updateEventAction({ lecturerId: obj ? obj.value : -1 });
  const handleChangeInDate = event => updateDate(event.target.value);
  const handleChangeInRequired = () => updateEventAction({ required: !eventProp.required });

  const currentLecturer = lecturers.find(lec => lec.id === eventProp.lecturerId);

  return (
    <section className="event-menu">
      <TimeAndIntervalSelector interval={eventProp.interval} date={curDate} error={error} />
      {eventProp.interval === 'NONE' ? (
        <FieldWithLabel
          labelValue={I18n.t('pages.classroom.occupation.date')}
          classNameLabel="simple-label simple-label_full"
          classNameField="date-range__date-picker base-field simple-label__input"
          classNameText="simple-label__text"
          type="date"
          value={curDate}
          hasError={!curDate && error}
          onChange={handleChangeInDate}
        />
      ) : (
        <DateRangeSelector
          date={curDate}
          disabled={!isFree}
          error={error}
          updateDate={updateDate}
        />
      )}
      <DropdownOption
        name="lecturer"
        message={I18n.t('pages.classroom.occupation.lecturer')}
        options={lecturers}
        wrapperClassName="event-menu__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="event-menu__drop-down-select"
        onChange={handleChangeInLecturer}
        curValue={currentLecturer}
        disabled={!isFree}
        error={!currentLecturer && error}
      />
      <EditableTextInfoBlock
        wrapperClassName="simple-label simple-label_full"
        headerClassName="simple-label__text"
        headerValue={I18n.t('pages.classroom.occupation.comment')}
        textClassName="event-menu__input base-field base-field__text simple-label__input event-menu__textarea"
        textName="comment"
        textValue={comment}
        textOnChange={handleChangeInComment}
        textOnBlur={onBlurComment}
        disabled={!isFree}
        hasError={!comment && error}
      />
      <Checkbox
        id="required"
        text={I18n.t('pages.classroom.occupation.require')}
        value={eventProp.required}
        onChange={handleChangeInRequired}
        disabled={!isFree}
      />
    </section>
  );
}

EventMenu.propTypes = {
  date: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  selectedClassroomId: PropTypes.number.isRequired,
  eventProp: PropTypes.shape({
    comment: PropTypes.string,
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
    interval: PropTypes.string,
    lecturerId: PropTypes.any,
    required: PropTypes.bool,
  }).isRequired,
  lecturers: PropTypes.arrayOf(PropTypes.shape({})),
  updateEvent: PropTypes.func,
  getLecturers: PropTypes.func,
  getClassroomWithEvents: PropTypes.func,
};

EventMenu.defaultProps = {
  hasError: false,
  lecturers: [],
  updateEvent: () => {},
  getLecturers: () => {},
  getClassroomWithEvents: () => {},
};

const mapStateToProps = state => ({
  eventProp: state.eventReducer.event,
  date: state.utilityReducer.date,
  lecturers: state.lecturersReducer.lecturers,
  isFree: state.eventReducer.isFree,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  hasError: state.eventReducer.hasError,
});

const mapDispatchToProps = dispatch => ({
  updateEvent: bindActionCreators(updateEvent, dispatch),
  getLecturers: bindActionCreators(getLecturersFetch, dispatch),
  getClassroomWithEvents: bindActionCreators(getClassroomWithEventsFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMenu);
