import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack, replace } from 'react-router-redux';

import ClassroomHeader from 'src/components/atoms/classroomHeader/ClassroomHeader';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import ClassroomsFooter from 'src/components/molecules/classroomsFooter/ClassroomsFooter';

import { clearEvent, changeIsFree } from 'src/actions/event/eventUtility';
import { checkUserFetch } from 'src/actions/user/whoAmI';
import { createEventFetch } from 'src/actions/event/createEvent';
import { deleteEventFetch } from 'src/actions/event/deleteEvent';

import * as paths from 'src/constants/paths';

import ColorInfo from './components/colorInfo/ColorInfo';
import EventMenu from './components/eventMenu/EventMenu';
import OccupyingButtons from './components/timeButtons/TimeButtons';

import './style.scss';

const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

function Classroom(props) {
  const {
    classroom,
    selectedClassroomId,
    eventProp,
    isFree,
    checkUser,
    createEvent,
    deleteEvent,
    historyGoBack,
    historyReplace,
    clearEvent: clearEventAction,
  } = props;

  useEffect(() => {
    checkUser();
    if (!selectedClassroomId || selectedClassroomId === -1) {
      historyReplace(paths.classrooms);
    }
  }, [checkUser, selectedClassroomId, historyReplace]);

  useEffect(
    () => () => {
      clearEventAction();
    },
    [clearEventAction]
  );

  const occupy = () => {
    if (
      eventProp.lecturerId === -1 ||
      eventProp.comment === '' ||
      eventProp.timeBlockId === -1 ||
      eventProp.dateFrom === '' ||
      eventProp.dateTo === '' ||
      eventProp.interval === ''
    ) {
      alert(I18n.t('pages.classroom.messages.unable-occupy'));
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
    props.changeIsFree(false);
  };

  const free = () => {
    if (!eventProp || !eventProp.id) {
      alert(I18n.t('pages.classroom.messages.unable-free'));
      return;
    }

    deleteEvent(eventProp.id);
    props.changeIsFree(true);
  };

  return (
    <React.Fragment>
      <article className="classroom">
        <ClassroomTags tags={classroom.tags} sectionClassName="classroom__tag-section" />
        <section className="classroom__middle-section">
          <ClassroomHeader
            number={classroom.number ? classroom.number : ''}
            className="classroom__middle-header"
          />
          <ColorInfo />
          <OccupyingButtons occupation={eventProp} />
        </section>
        <EventMenu />
      </article>
      <ClassroomsFooter
        footerClassName="classroom-footer"
        firstButtonFunc={historyGoBack}
        firstButtonValue={I18n.t('pages.classroom.footer.buttons.back')}
        secondButtonFunc={isFree ? occupy : free}
        secondButtonValue={I18n.t(`pages.classroom.footer.buttons.${isFree ? 'occupy' : 'free'}`)}
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
  checkUser: PropTypes.func,
  historyReplace: PropTypes.func,
  historyGoBack: PropTypes.func,
  createEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
  clearEvent: PropTypes.func,
  changeIsFree: PropTypes.func,
};

Classroom.defaultProps = {
  checkUser: () => {},
  historyGoBack: () => {},
  historyReplace: () => {},
  createEvent: () => {},
  deleteEvent: () => {},
  clearEvent: () => {},
  changeIsFree: () => {},
};

const mapDispatchToProps = dispatch => ({
  clearEvent: bindActionCreators(clearEvent, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  historyGoBack: bindActionCreators(goBack, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
  createEvent: bindActionCreators(createEventFetch, dispatch),
  deleteEvent: bindActionCreators(deleteEventFetch, dispatch),
  changeIsFree: bindActionCreators(changeIsFree, dispatch),
});

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  eventProp: state.eventReducer.event,
  isFree: state.eventReducer.isFree,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
