import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DialogWindow from 'src/components/molecules/dialogWindow/DialogWindow';
import Button from 'src/components/atoms/button/Button';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';
import DateRangeSelector from 'src/components/molecules/dateRangeSelector/DateRangeSelector';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import TextArea from 'src/components/atoms/textArea/TextArea';

import { createScheduleItemFetch } from 'src/actions/schedule/createScheduleItem';
import { editScheduleItemFetch } from 'src/actions/schedule/editScheduleItem';
import { closeDialogWindow } from 'src/actions/utility/dialogWindow';
import { getClassroomForRescheduleFetch } from 'src/actions/classrooms/getClassroomWithEvents';
import { clearScheduleItem } from 'src/actions/schedule/utility';
import { intervalsValue } from 'src/utils/date';

import DisciplineAndActivityOptions from '../disciplineAndActivityOptions/DisciplineAndActivityOptions';
import LecturerAndRequiredOptions from '../lecturerAndRequiredOptions/LecturerAndRequiredOptions';
import BuildingAndAuditory from '../buildingAndAuditoryOptions/BuildingAndAuditoryOptions';

import './style.scss';

const intervals = intervalsValue.map(value => ({
  value,
  label: I18n.t(`components.intervals.${value.toLowerCase()}`),
}));

function ScheduleItemDialog(props) {
  const {
    isOpen,
    timeBlocks,
    events,
    groups,
    groupId,
    createScheduleItem,
    editingSchedule,
    classrooms,
    scheduleItem,
    getClassroomForReschedule,
    editScheduleItem,
    closeDialogWindow: closeDialogWindowAction,
    clearScheduleItem: clearScheduleItemAction,
  } = props;

  const [required, changeRequired] = useState(false);
  const [lecturerId, changeLecturerId] = useState(-1);
  const [interval, changeInterval] = useState(intervalsValue[0]);
  const [dateFrom, changeDateFrom] = useState('');
  const [dateTo, changeDateTo] = useState('');
  const [building, changeBuilding] = useState(-1);
  const [classroomId, changeClassroomId] = useState(-1);
  const [timeBlockId, changeTimeBlockId] = useState(-1);
  const [comment, changeComment] = useState('');
  const [activityType, changeActivityType] = useState('');
  const [disciplineId, changeDisciplineId] = useState(-1);
  const [groupIds, changeGroupIds] = useState(groupId ? [groupId] : []);

  const handleChangeInIntervals = obj => changeInterval(obj ? obj.value : intervalsValue[0]);
  const handleChangeInDate = event => {
    changeDateFrom(event.target.value);
    changeDateTo(event.target.value);
  };
  const handleChangeInTime = obj => changeTimeBlockId(obj ? obj.value : -1);
  const handleChangeInComment = event => changeComment(event.target.value);
  const handleChangeInGroup = array => changeGroupIds(array ? array.map(item => item.value) : []);

  useEffect(() => {
    changeGroupIds([groupId]);
  }, [groupId, changeGroupIds]);
  useEffect(() => {
    if (dateFrom && dateTo && classroomId !== -1 && interval) {
      getClassroomForReschedule(classroomId, dateFrom, dateTo, interval);
    }
  }, [dateFrom, dateTo, classroomId, interval, getClassroomForReschedule]);
  useEffect(() => {
    if (scheduleItem) {
      changeRequired(scheduleItem.event.required);
      changeLecturerId(scheduleItem.event.lecturerId);
      changeInterval(scheduleItem.event.periods[0].interval);
      changeDateFrom(scheduleItem.event.periods[0].dateFrom);
      changeDateTo(scheduleItem.event.periods[0].dateTo);
      changeBuilding(scheduleItem.event.periods[0].building);
      changeClassroomId(scheduleItem.event.periods[0].classroomId);
      changeTimeBlockId(scheduleItem.event.periods[0].timeBlockId);
      changeComment(scheduleItem.event.comment);
      changeActivityType(scheduleItem.activityType);
      changeDisciplineId(scheduleItem.disciplineId);
      changeGroupIds(scheduleItem.groupIds);
    }
  }, [
    scheduleItem,
    changeRequired,
    changeLecturerId,
    changeInterval,
    changeDateFrom,
    changeDateTo,
    changeBuilding,
    changeClassroomId,
    changeTimeBlockId,
    changeComment,
    changeActivityType,
    changeDisciplineId,
    changeGroupIds,
  ]);
  useEffect(
    () => () => {
      clearScheduleItemAction();
    },
    [clearScheduleItemAction]
  );

  const onClick = () => {
    const tb = timeBlocks.find(item => item.id === timeBlockId);
    const body = {
      event: {
        lecturerId,
        required,
        periods: [
          {
            eventPeriodId: scheduleItem ? scheduleItem.event.periods[0].eventPeriodId : null,
            classroomId,
            building,
            classroom: classrooms.find(cl => cl.id === classroomId),
            timeBlockId,
            timeBlock: {
              ...tb,
              label: `${tb.timeFrom}-${tb.timeTo}`,
              value: tb.id,
            },
            dateFrom,
            dateTo,
            interval,
          },
        ],
        comment,
      },
      activityType,
      disciplineId,
      groupIds,
      groups: groups.filter(group => groupIds.includes(group.id)),
      id: scheduleItem ? scheduleItem.id : null,
    };
    if (scheduleItem) {
      editScheduleItem(scheduleItem.id, body);
    } else {
      createScheduleItem(editingSchedule.id, body);
    }
    changeRequired(false);
    changeLecturerId(-1);
    changeInterval(intervalsValue[0]);
    changeDateFrom('');
    changeDateTo('');
    changeBuilding(-1);
    changeClassroomId(-1);
    changeTimeBlockId(-1);
    changeComment('');
    changeActivityType('');
    changeDisciplineId(-1);
    changeGroupIds([]);
    closeDialogWindowAction();
  };

  const times = timeBlocks
    .filter(
      time =>
        !events.some(event =>
          event.eventPeriods.some(eventPeriod => eventPeriod.timeBlock.id === time.id)
        )
    )
    .map(time => ({
      ...time,
      label: `${time.timeFrom}-${time.timeTo}`,
      value: time.id,
    }));

  if (
    scheduleItem &&
    times.findIndex(t => t.id === scheduleItem.event.periods[0].timeBlockId) === -1
  ) {
    times.push(scheduleItem.event.periods[0].timeBlock);
  }

  return (
    <DialogWindow className="schedule-item-dialog" isOpen={isOpen}>
      <DisciplineAndActivityOptions
        activityType={activityType}
        disciplineId={disciplineId}
        changeActivityType={changeActivityType}
        changeDisciplineId={changeDisciplineId}
      />
      <LecturerAndRequiredOptions
        required={required}
        lecturerId={lecturerId}
        changeRequired={changeRequired}
        changeLecturerId={changeLecturerId}
      />
      <DropdownOption
        name="groups"
        wrapperClassName="schedule-item-dialog__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="schedule-item-dialog__drop-down-select"
        options={groups}
        message={I18n.t('components.labels.groups')}
        onChange={handleChangeInGroup}
        isMulti
        curValues={groups.filter(group => groupIds.includes(group.value))}
      />
      <BuildingAndAuditory
        building={building}
        classroomId={classroomId}
        changeBuilding={changeBuilding}
        changeClassroomId={changeClassroomId}
      />
      <DropdownOption
        name="interval"
        message={I18n.t('components.labels.interval')}
        options={intervals}
        textClassName="simple-label__text"
        wrapperClassName="schedule-item-dialog__drop-down-wrapper"
        selectClassName="schedule-item-dialog__drop-down-select"
        onChange={handleChangeInIntervals}
        curValue={intervals.find(int => int.value === interval)}
        isClearable={false}
      />
      {interval !== intervalsValue[0] ? (
        <DateRangeSelector
          dateFrom={dateFrom}
          dateTo={dateTo}
          updateDateFrom={changeDateFrom}
          updateDateTo={changeDateTo}
          labelClassname="simple-label__text_small"
          fieldClassname="date-picker__small"
        />
      ) : (
        <FieldWithLabel
          labelValue={I18n.t('components.labels.date')}
          classNameLabel="simple-label simple-label_full"
          classNameField="date-range__date-picker date-picker__small base-field simple-label__input"
          classNameText="simple-label__text_small"
          type="date"
          value={dateFrom}
          onChange={handleChangeInDate}
        />
      )}
      {dateFrom && dateTo && classroomId !== -1 ? (
        <DropdownOption
          message={I18n.t('components.labels.time')}
          name="time"
          options={times}
          textClassName="simple-label__text"
          wrapperClassName="schedule-item-dialog__drop-down-wrapper"
          selectClassName="schedule-item-dialog__drop-down-select"
          onChange={handleChangeInTime}
          curValue={times.find(item => item.id === timeBlockId)}
        />
      ) : null}
      <TextArea
        wrapperClassName="simple-label simple-label_full text-area_small"
        headerClassName="simple-label__text"
        headerValue={I18n.t('components.labels.comment')}
        textClassName="event-menu__input base-field base-field__text simple-label__input event-menu__textarea"
        textName="comment"
        textValue={comment}
        textOnChange={handleChangeInComment}
      />
      {lecturerId !== -1 &&
      !!dateFrom &&
      !!dateTo &&
      classroomId !== -1 &&
      timeBlockId !== -1 &&
      !!activityType &&
      disciplineId !== -1 &&
      groupIds.length !== 0 ? (
        <Button
          className="action-button schedule-item-dialog__save-button"
          onClick={onClick}
          value={I18n.t('components.buttons.save')}
        />
      ) : null}
    </DialogWindow>
  );
}

ScheduleItemDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  createScheduleItem: PropTypes.func.isRequired,
  closeDialogWindow: PropTypes.func.isRequired,
  getClassroomForReschedule: PropTypes.func.isRequired,
  clearScheduleItem: PropTypes.func.isRequired,
  editScheduleItem: PropTypes.func.isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classrooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  scheduleItem: PropTypes.shape({
    event: PropTypes.shape({
      required: PropTypes.bool,
      lecturerId: PropTypes.number,
      comment: PropTypes.string,
      periods: PropTypes.arrayOf(
        PropTypes.shape({
          interval: PropTypes.string,
          dateFrom: PropTypes.string,
          dateTo: PropTypes.string,
          building: PropTypes.number,
          classroomId: PropTypes.number,
          timeBlockId: PropTypes.number,
          eventPeriodId: PropTypes.number,
          timeBlock: PropTypes.shape({
            id: PropTypes.number,
          }),
        })
      ),
    }),
    activityType: PropTypes.string,
    disciplineId: PropTypes.number,
    groupIds: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number.isRequired,
  }),
  editingSchedule: PropTypes.shape({
    id: PropTypes.number,
  }),
  groupId: PropTypes.number,
};

ScheduleItemDialog.defaultProps = {
  editingSchedule: {},
  groupId: null,
  scheduleItem: null,
};

const mapStateToProps = state => ({
  isOpen: state.utilityReducer.isScheduleItemDialogOpen,
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.rescheduleReducer.rescheduleEvents,
  groupId: state.groupsReducer.groupId,
  groups: state.groupsReducer.groups,
  editingSchedule: state.scheduleReducer.editingSchedule,
  classrooms: state.rescheduleReducer.rescheduleClassrooms,
  scheduleItem: state.scheduleReducer.scheduleItem,
});

const mapDispatchToProps = dispatch => ({
  createScheduleItem: bindActionCreators(createScheduleItemFetch, dispatch),
  closeDialogWindow: bindActionCreators(closeDialogWindow, dispatch),
  getClassroomForReschedule: bindActionCreators(getClassroomForRescheduleFetch, dispatch),
  clearScheduleItem: bindActionCreators(clearScheduleItem, dispatch),
  editScheduleItem: bindActionCreators(editScheduleItemFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleItemDialog);
