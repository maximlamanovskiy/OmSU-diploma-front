import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack, replace } from 'react-router-redux';

import Header from 'src/components/atoms/header/Header';
import Message from 'src/components/atoms/message/Message';
import Footer from 'src/components/molecules/footer/Footer';

import { deleteEventFetch } from 'src/actions/event/deleteEvent';
import { cancelEventFetch } from 'src/actions/event/cancelEvent';
import { openDialogWindow } from 'src/actions/utility/dialogWindow';
import { checkUserFetch } from 'src/actions/user/whoAmI';
import { getPeriodsFetch } from 'src/actions/event/getPeriods';

import * as paths from 'src/constants/paths';

import EventDate from './components/eventDate/EventDate';
import RescheduleEventDialog from './components/rescheduleEventDialog/RescheduleEventDialog';
import EditEventDialog from './components/editEventDialog/EditEventDialog';

import './style.scss';

function Event(props) {
  const {
    historyGoBack,
    fullEvent,
    historyReplace,
    deleteEvent,
    cancelEvent,
    openDialogWindow: openDialogWindowAction,
    reschedule,
    checkUser,
    getPeriods,
  } = props;

  useEffect(() => {
    if (!fullEvent) {
      historyReplace(paths.classrooms);
    }
    checkUser();
  }, [fullEvent, historyReplace, checkUser]);

  const lecturer = fullEvent
    ? `${fullEvent.lecturer.lastName} ${fullEvent.lecturer.firstName} ${fullEvent.lecturer.patronymic}`
    : '';

  const clickDelete = () => {
    deleteEvent(fullEvent.id);
    historyGoBack();
  };
  const clickCancel = () =>
    cancelEvent(
      { eventPeriodId: reschedule.period.eventPeriodId, dates: [reschedule.from] },
      reschedule
    );
  const clickEdit = () => {
    getPeriods(fullEvent.id);
    openDialogWindowAction();
  };
  const clickReschedule = () => openDialogWindowAction();

  return (
    <React.Fragment>
      <Header className="event-header" value={lecturer} />
      <Message className="event-comment" value={fullEvent.comment} />
      <EventDate />
      <Footer
        footerClassName="event-footer"
        functions={[
          historyGoBack,
          !reschedule.from ? clickDelete : clickCancel,
          !reschedule.from ? clickEdit : clickReschedule,
        ]}
        values={[
          I18n.t('components.buttons.back'),
          I18n.t(`components.buttons.${!reschedule.from ? 'delete' : 'cancel'}`),
          I18n.t(`components.buttons.${!reschedule.from ? 'edit' : 'reschedule'}`),
        ]}
        keys={[1, 2, 3]}
      />
      {!reschedule.from ? <EditEventDialog /> : <RescheduleEventDialog />}
    </React.Fragment>
  );
}

Event.propTypes = {
  historyGoBack: PropTypes.func,
  historyReplace: PropTypes.func,
  deleteEvent: PropTypes.func,
  cancelEvent: PropTypes.func,
  openDialogWindow: PropTypes.func,
  checkUser: PropTypes.func,
  getPeriods: PropTypes.func,
  fullEvent: PropTypes.shape({
    id: PropTypes.number,
    comment: PropTypes.string,
    lecturer: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      patronymic: PropTypes.string,
    }),
  }),
  reschedule: PropTypes.shape({
    from: PropTypes.string,
    period: PropTypes.shape({
      eventPeriodId: PropTypes.number,
    }),
  }),
};

Event.defaultProps = {
  historyGoBack: () => {},
  historyReplace: () => {},
  deleteEvent: () => {},
  cancelEvent: () => {},
  openDialogWindow: () => {},
  checkUser: () => {},
  getPeriods: () => {},
  fullEvent: {
    comment: '',
    lecturer: {
      lastName: '',
      firstName: '',
      patronymic: '',
    },
  },
  reschedule: {},
};

const mapStateToProps = state => ({
  fullEvent: state.eventReducer.fullEvent,
  reschedule: state.rescheduleReducer.reschedule,
});

const mapDispatchToProps = dispatch => ({
  historyGoBack: bindActionCreators(goBack, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
  deleteEvent: bindActionCreators(deleteEventFetch, dispatch),
  cancelEvent: bindActionCreators(cancelEventFetch, dispatch),
  openDialogWindow: bindActionCreators(openDialogWindow, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  getPeriods: bindActionCreators(getPeriodsFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
