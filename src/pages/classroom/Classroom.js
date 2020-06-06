import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack, replace, push } from 'react-router-redux';

import Header from 'src/components/atoms/header/Header';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import Footer from 'src/components/molecules/footer/Footer';

import { clearEvent, selectTime, updateEvent } from 'src/actions/event/eventUtility';
import { createEventFetch } from 'src/actions/event/createEvent';
import { getEventFetch } from 'src/actions/event/getEvent';
import { checkUserFetch } from 'src/actions/user/whoAmI';
import { getClassroomWithEventsFetch } from 'src/actions/classrooms/getClassroomWithEvents';

import * as paths from 'src/constants/paths';
import { days } from 'src/utils/date';

import ColorInfo from './components/colorInfo/ColorInfo';
import EventMenu from './components/eventMenu/EventMenu';
import OccupyingButtons from './components/timeButtons/TimeButtons';

import './style.scss';

function Classroom(props) {
  const {
    classroom,
    selectedClassroomId,
    eventProp,
    isFree,
    createEvent,
    historyGoBack,
    historyReplace,
    historyPush,
    clearEvent: clearEventAction,
    selectTime: selectTimeAction,
    updateEvent: updateEventAction,
    getEvent,
    checkUser,
    getClassroomWithEvents,
    date,
    selectedEvent,
  } = props;

  const [error, setError] = useState(false);
  const [curDateFrom, setCurDateFrom] = useState(date);
  const [curDateTo, setCurDateTo] = useState(date);

  useEffect(() => {
    if (!selectedClassroomId || selectedClassroomId === -1) {
      historyReplace(paths.classrooms);
    }
    checkUser();
    updateEventAction({ dateFrom: date, dateTo: date });
    return () => {
      clearEventAction();
      selectTimeAction(-1);
    };
  }, [
    selectedClassroomId,
    historyReplace,
    checkUser,
    clearEventAction,
    selectTimeAction,
    date,
    updateEventAction,
  ]);

  useEffect(() => {
    if (curDateFrom && curDateTo && selectedClassroomId !== -1) {
      getClassroomWithEvents(selectedClassroomId, curDateFrom, curDateTo);
    }
  }, [getClassroomWithEvents, selectedClassroomId, curDateFrom, curDateTo]);

  const occupy = () => {
    if (eventProp.lecturerId === -1 || eventProp.timeBlockId === -1) {
      setError(true);
      return;
    }

    createEvent({
      lecturerId: eventProp.lecturerId,
      comment: eventProp.comment,
      required: !!eventProp.required,
      periods: [
        {
          classroomId: selectedClassroomId,
          timeBlockId: eventProp.timeBlockId,
          day: days[new Date(eventProp.dateFrom).getDay()],
          dateFrom: eventProp.dateFrom,
          dateTo: eventProp.dateTo,
          interval: eventProp.interval,
        },
      ],
    });
    clearEventAction();
    setError(false);
  };

  const getInfo = () => {
    if (selectedEvent === -1) {
      return;
    }
    getEvent(selectedEvent);
    historyPush(paths.event);
  };

  const number = classroom.number ? classroom.number : '';

  return (
    <React.Fragment>
      <article className="classroom">
        <ClassroomTags tags={classroom.tags} sectionClassName="classroom__tag-section" />
        <section className="classroom__middle-section">
          <Header
            value={I18n.t('pages.classroom.header.number', { number })}
            className="classroom-header"
          />
          <ColorInfo />
          <OccupyingButtons occupation={eventProp} />
        </section>
        <EventMenu
          error={error}
          dateTo={curDateTo}
          dateFrom={curDateFrom}
          setDateFrom={setCurDateFrom}
          setDateTo={setCurDateTo}
        />
      </article>
      <Footer
        footerClassName="classroom-footer"
        functions={[historyGoBack, isFree ? occupy : getInfo]}
        values={[
          I18n.t('components.buttons.back'),
          I18n.t(`components.buttons.${isFree ? 'occupy' : 'details'}`),
        ]}
        keys={[1, 2]}
      />
    </React.Fragment>
  );
}

Classroom.propTypes = {
  classroom: PropTypes.shape({
    number: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any,
        tag: PropTypes.string,
      })
    ),
  }).isRequired,
  selectedClassroomId: PropTypes.number.isRequired,
  selectedEvent: PropTypes.number.isRequired,
  date: PropTypes.string,
  eventProp: PropTypes.shape({
    id: PropTypes.any,
    lecturerId: PropTypes.any,
    timeBlockId: PropTypes.any,
    required: PropTypes.bool,
    dateTo: PropTypes.string,
    dateFrom: PropTypes.string,
    interval: PropTypes.string,
    comment: PropTypes.string,
  }).isRequired,
  isFree: PropTypes.bool.isRequired,
  historyReplace: PropTypes.func,
  historyGoBack: PropTypes.func,
  historyPush: PropTypes.func,
  createEvent: PropTypes.func,
  clearEvent: PropTypes.func,
  selectTime: PropTypes.func,
  getEvent: PropTypes.func,
  checkUser: PropTypes.func,
  getClassroomWithEvents: PropTypes.func,
  updateEvent: PropTypes.func,
};

Classroom.defaultProps = {
  date: '',
  historyGoBack: () => {},
  historyReplace: () => {},
  historyPush: () => {},
  createEvent: () => {},
  clearEvent: () => {},
  selectTime: () => {},
  getEvent: () => {},
  checkUser: () => {},
  getClassroomWithEvents: () => {},
  updateEvent: () => {},
};

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  eventProp: state.eventReducer.event,
  isFree: state.eventReducer.isFree,
  selectedEvent: state.eventReducer.selectedEvent,
  date: state.utilityReducer.date,
});

const mapDispatchToProps = dispatch => ({
  clearEvent: bindActionCreators(clearEvent, dispatch),
  historyGoBack: bindActionCreators(goBack, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
  historyPush: bindActionCreators(push, dispatch),
  createEvent: bindActionCreators(createEventFetch, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
  getEvent: bindActionCreators(getEventFetch, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  getClassroomWithEvents: bindActionCreators(getClassroomWithEventsFetch, dispatch),
  updateEvent: bindActionCreators(updateEvent, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
