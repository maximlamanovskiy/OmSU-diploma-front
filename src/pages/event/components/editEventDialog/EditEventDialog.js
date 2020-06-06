import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DialogWindow from 'src/components/molecules/dialogWindow/DialogWindow';
import Footer from 'src/components/molecules/footer/Footer';

import { closeDialogWindow } from 'src/actions/utility/dialogWindow';
import { updateEventFetch } from 'src/actions/event/updateEvent';

import EditPeriodMenu from '../editPeriodMenu/EditPeriodMenu';
import EditEventMenu from '../editEventMenu/EditEventMenu';

import './style.scss';

function EditEventDialog(props) {
  const { fullEvent, closeDialogWindow: closeDialogWindowAction, updateEvent } = props;

  const defaultEvent = {
    id: fullEvent.id,
    lecturerId: fullEvent.lecturer.id,
    lecturer: fullEvent.lecturer,
    required: fullEvent.required,
    periods: fullEvent.periods.map(period => ({
      ...period,
      eventPeriodId: period.id,
      classroomId: period.classroom.id,
      timeBlockId: period.timeBlock.id,
      day: period.day,
      dateFrom: period.dateFrom,
      dateTo: period.dateTo,
      interval: period.interval,
      buildingNumber: period.classroom.buildingNumber,
    })),
    comment: fullEvent.comment,
  };

  const [newEvent, setNewEvent] = useState({});
  const [selectedPeriod, selectPeriod] = useState(-1);
  const [newPeriod, setNewPeriod] = useState(null);

  useEffect(() => {
    setNewEvent({
      id: fullEvent.id,
      lecturerId: fullEvent.lecturer.id,
      lecturer: fullEvent.lecturer,
      required: fullEvent.required,
      periods: fullEvent.periods.map(period => ({
        ...period,
        eventPeriodId: period.id,
        classroomId: period.classroom.id,
        timeBlockId: period.timeBlock.id,
        day: period.day,
        dateFrom: period.dateFrom,
        dateTo: period.dateTo,
        interval: period.interval,
        buildingNumber: period.classroom.buildingNumber,
        classroom: { ...period.classroom },
        timeBlock: { ...period.timeBlock },
      })),
      comment: fullEvent.comment,
    });
  }, [fullEvent, setNewEvent]);

  const clickCancel = () => {
    closeDialogWindowAction();
    setNewEvent({ ...defaultEvent });
  };
  const clickBack = () => selectPeriod(-1);
  const clickSave = () => {
    const newArray = [...newEvent.periods];
    newArray[
      newEvent.periods.findIndex(period => period.eventPeriodId === selectedPeriod)
    ] = newPeriod;
    setNewEvent({
      ...newEvent,
      periods: newArray,
    });
    selectPeriod(-1);
  };
  const clickUpdate = () => {
    closeDialogWindowAction();
    updateEvent(fullEvent.id, newEvent);
  };
  const onEditClick = id => {
    setNewPeriod({ ...newEvent.periods.find(period => period.eventPeriodId === id) });
    selectPeriod(id);
  };

  const isEdit = selectedPeriod !== -1;

  return (
    <DialogWindow className="edit-dialog">
      {isEdit ? (
        <EditPeriodMenu period={newPeriod} updatePeriod={setNewPeriod} />
      ) : (
        <EditEventMenu
          handleOnEditClick={onEditClick}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          defaultEvent={defaultEvent}
        />
      )}
      <Footer
        buttonClassName="action-button edit-dialog__button"
        functions={[isEdit ? clickBack : clickCancel, isEdit ? clickSave : clickUpdate]}
        values={[
          I18n.t(`components.buttons.${isEdit ? 'back' : 'cancel'}`),
          I18n.t(`components.buttons.${isEdit ? 'apply' : 'save'}`),
        ]}
        keys={[1, 2]}
      />
    </DialogWindow>
  );
}

EditEventDialog.propTypes = {
  fullEvent: PropTypes.shape({
    id: PropTypes.number,
    lecturer: PropTypes.shape({
      id: PropTypes.number,
    }),
    required: PropTypes.bool,
    periods: PropTypes.arrayOf(PropTypes.shape({})),
    comment: PropTypes.string,
  }),
  closeDialogWindow: PropTypes.func,
  updateEvent: PropTypes.func,
};

EditEventDialog.defaultProps = {
  fullEvent: {},
  closeDialogWindow: () => {},
  updateEvent: () => {},
};

const mapStateToProps = state => ({
  fullEvent: state.eventReducer.fullEvent,
});

const mapDispatchToProps = dispatch => ({
  closeDialogWindow: bindActionCreators(closeDialogWindow, dispatch),
  updateEvent: bindActionCreators(updateEventFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventDialog);
