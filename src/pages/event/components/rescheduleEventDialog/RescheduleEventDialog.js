import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DialogWindow from 'src/components/molecules/dialogWindow/DialogWindow';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getBuildingsFetch } from 'src/actions/buildings/getBuildingsAction';
import { getClassroomsForRescheduleFetch } from 'src/actions/classrooms/getClassrooms';
import { getClassroomForRescheduleFetch } from 'src/actions/classrooms/getClassroomWithEvents';
import { rescheduleEventFetch } from 'src/actions/event/rescheduleEvent';
import { updateReschedule, clearReschedule } from 'src/actions/utility/reschedule';

import './style.scss';

function RescheduleEventDialog(props) {
  const {
    buildings,
    classrooms,
    getBuildings,
    getClassrooms,
    timeBlocks,
    events,
    getClassroom,
    reschedule,
    updateReschedule: updateRescheduleAction,
    clearReschedule: clearRescheduleAction,
    rescheduleEvent,
  } = props;

  const [selectedBuilding, selectBuilding] = useState(-1);

  useEffect(() => {
    getBuildings();
    return () => {
      clearRescheduleAction();
    };
  }, [getBuildings, clearRescheduleAction]);

  const onBuildingChange = obj => {
    if (obj) {
      getClassrooms(obj.value, 0);
    }
    selectBuilding(obj ? obj.value : -1);
  };

  const onClassroomChange = obj => {
    updateRescheduleAction({
      classroomId: obj ? obj.value : null,
      classroom: obj ? obj.number : null,
    });
    if (obj && reschedule.to) {
      getClassroom(obj.value, reschedule.to);
    }
  };

  const handleChangeInDate = event => {
    const to = event.target.value;
    updateRescheduleAction({ to });
    if (to && reschedule.classroomId) {
      getClassroom(reschedule.classroomId, to);
    }
  };

  const onTimeChange = obj =>
    updateRescheduleAction({
      timeBlockId: obj ? obj.value : null,
      timeFrom: obj ? obj.timeFrom : null,
      timeTo: obj ? obj.timeTo : null,
    });

  const times = timeBlocks
    .filter(
      time =>
        !events.some(event => event.eventPeriods.some(period => period.timeBlock.id === time.id))
    )
    .map(time => ({
      ...time,
      label: `${time.timeFrom}-${time.timeTo}`,
      value: time.id,
    }));

  const clickReschedule = () => rescheduleEvent(reschedule);

  return (
    <DialogWindow className="reschedule-dialog">
      <DropdownOption
        message={I18n.t('components.labels.building')}
        name="buildings"
        options={buildings}
        textClassName="simple-label__text"
        onChange={onBuildingChange}
        curValue={buildings.find(item => item.value === selectedBuilding)}
      />
      {selectedBuilding !== -1 ? (
        <DropdownOption
          message={I18n.t('components.labels.classroom-number')}
          name="classrooms"
          options={classrooms}
          textClassName="simple-label__text"
          onChange={onClassroomChange}
          curValue={classrooms.find(item => item.value === reschedule.classroomId)}
        />
      ) : null}
      {selectedBuilding !== -1 ? (
        <FieldWithLabel
          labelValue={I18n.t('components.labels.date')}
          classNameLabel="simple-label simple-label_full"
          classNameField="date-range__date-picker base-field simple-label__input"
          classNameText="simple-label__text"
          type="date"
          value={reschedule.to ? reschedule.to : ''}
          onChange={handleChangeInDate}
        />
      ) : null}
      {reschedule.to && reschedule.classroomId ? (
        <DropdownOption
          message={I18n.t('components.labels.time')}
          name="timeTo"
          options={times}
          textClassName="simple-label__text"
          onChange={onTimeChange}
          curValue={times.find(item => item.value === reschedule.timeBlockId)}
        />
      ) : null}
      {reschedule.classroomId &&
      reschedule.timeBlockId &&
      reschedule.from &&
      reschedule.to &&
      selectedBuilding !== -1 ? (
        <Button
          className="action-button reschedule-dialog__button"
          value={I18n.t(`components.buttons.reschedule`)}
          onClick={clickReschedule}
        />
      ) : null}
    </DialogWindow>
  );
}

RescheduleEventDialog.propTypes = {
  buildings: PropTypes.arrayOf(PropTypes.shape({})),
  classrooms: PropTypes.arrayOf(PropTypes.shape({})),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})),
  reschedule: PropTypes.shape({
    classroomId: PropTypes.number,
    timeBlockId: PropTypes.number,
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  getBuildings: PropTypes.func,
  getClassrooms: PropTypes.func,
  getClassroom: PropTypes.func,
  updateReschedule: PropTypes.func,
  clearReschedule: PropTypes.func,
  rescheduleEvent: PropTypes.func,
};

RescheduleEventDialog.defaultProps = {
  buildings: [],
  classrooms: [],
  events: [],
  timeBlocks: [],
  reschedule: {},
  getBuildings: () => {},
  getClassrooms: () => {},
  getClassroom: () => {},
  updateReschedule: () => {},
  clearReschedule: () => {},
  rescheduleEvent: () => {},
};

const mapStateToProps = state => ({
  buildings: state.buildingReducer.buildings,
  classrooms: state.rescheduleReducer.rescheduleClassrooms,
  events: state.rescheduleReducer.rescheduleEvents,
  timeBlocks: state.timeblocksReducer.timeBlocks,
  reschedule: state.rescheduleReducer.reschedule,
});

const mapDispatchToProps = dispatch => ({
  getBuildings: bindActionCreators(getBuildingsFetch, dispatch),
  getClassrooms: bindActionCreators(getClassroomsForRescheduleFetch, dispatch),
  getClassroom: bindActionCreators(getClassroomForRescheduleFetch, dispatch),
  updateReschedule: bindActionCreators(updateReschedule, dispatch),
  clearReschedule: bindActionCreators(clearReschedule, dispatch),
  rescheduleEvent: bindActionCreators(rescheduleEventFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RescheduleEventDialog);
