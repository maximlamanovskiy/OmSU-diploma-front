import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack, replace, push } from 'react-router-redux';

import Header from 'src/components/atoms/header/Header';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import Footer from 'src/components/molecules/footer/Footer';

import { clearEvent, selectTime } from 'src/actions/event/eventUtility';
import { createEventFetch } from 'src/actions/event/createEvent';
import { getEventFetch } from 'src/actions/event/getEvent';

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
    getEvent,
  } = props;

  useEffect(() => {
    if (!selectedClassroomId || selectedClassroomId === -1) {
      historyReplace(paths.classrooms);
    }
  }, [selectedClassroomId, historyReplace]);

  useEffect(
    () => () => {
      clearEventAction();
      selectTimeAction(-1);
    },
    [clearEventAction, selectTimeAction]
  );

  const [error, setError] = useState(false);

  const occupy = () => {
    if (
      eventProp.lecturerId === -1 ||
      eventProp.comment === '' ||
      eventProp.timeBlockId === -1 ||
      eventProp.dateFrom === '' ||
      eventProp.dateTo === '' ||
      eventProp.interval === ''
    ) {
      setError(true);
      return;
    }

    const { dateFrom } = eventProp;

    const req = {
      lecturerId: eventProp.lecturerId,
      comment: eventProp.comment,
      required: !!eventProp.required,
      periods: [
        {
          classroomId: selectedClassroomId,
          timeBlockId: eventProp.timeBlockId,
          day: days[new Date(dateFrom).getDay()],
          dateFrom,
          dateTo: eventProp.dateTo,
          interval: eventProp.interval,
        },
      ],
    };

    createEvent(req);
  };

  const getInfo = () => {
    if (!eventProp || !eventProp.id) {
      return;
    }
    getEvent(eventProp.id);
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
        <EventMenu error={error} />
      </article>
      <Footer
        footerClassName="classroom-footer"
        functions={[historyGoBack, isFree ? occupy : getInfo]}
        values={[
          I18n.t('pages.classroom.footer.buttons.back'),
          I18n.t(`pages.classroom.footer.buttons.${isFree ? 'occupy' : 'details'}`),
        ]}
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
};

Classroom.defaultProps = {
  historyGoBack: () => {},
  historyReplace: () => {},
  historyPush: () => {},
  createEvent: () => {},
  clearEvent: () => {},
  selectTime: () => {},
  getEvent: () => {},
};

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  eventProp: state.eventReducer.event,
  isFree: state.eventReducer.isFree,
});

const mapDispatchToProps = dispatch => ({
  clearEvent: bindActionCreators(clearEvent, dispatch),
  historyGoBack: bindActionCreators(goBack, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
  historyPush: bindActionCreators(push, dispatch),
  createEvent: bindActionCreators(createEventFetch, dispatch),
  selectTime: bindActionCreators(selectTime, dispatch),
  getEvent: bindActionCreators(getEventFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
