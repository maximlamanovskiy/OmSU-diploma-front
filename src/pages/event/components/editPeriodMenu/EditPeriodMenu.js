import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DateRangeSelector from 'src/components/molecules/dateRangeSelector/DateRangeSelector';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getClassroomsForRescheduleFetch } from 'src/actions/classrooms/getClassrooms';
import { intervalsValue } from 'src/utils/date';

import './style.scss';

const intervals = intervalsValue.map(value => ({
  value,
  label: I18n.t(`pages.classroom.occupation.intervals.${value.toLowerCase()}`),
}));

function EditPeriodMenu(props) {
  const {
    period,
    buildings,
    classrooms,
    timeBlocks,
    events,
    getClassroomsForReschedule,
    updatePeriod,
  } = props;

  useEffect(() => {
    if (period) {
      const building = buildings.find(item => item.value === period.buildingNumber);
      getClassroomsForReschedule(building.value, 0);
    }
  }, [getClassroomsForReschedule, period, buildings]);

  const handleChangeInDate = event =>
    updatePeriod({ ...period, dateFrom: event.target.value, dateTo: event.target.value });
  const handleChangeInIntervals = obj =>
    updatePeriod({ ...period, interval: obj ? obj.value : intervals[0] });
  const handleChangeInBuilding = obj =>
    updatePeriod({ ...period, buildingNumber: obj ? obj.value : -1 });
  const handleChangeInDateFrom = dateFrom => updatePeriod({ ...period, dateFrom });
  const handleChangeInDateTo = dateTo => updatePeriod({ ...period, dateTo });
  const handleChangeInClassroom = obj =>
    updatePeriod({
      ...period,
      classroom: obj ? { ...obj } : {},
      classroomId: obj ? obj.value : -1,
    });
  const handleChangeInTimeBlock = obj =>
    updatePeriod({
      ...period,
      timeBlock: obj ? { ...obj } : {},
      timeBlockId: obj ? obj.value : -1,
    });

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

  return (
    <div className="edit-period-menu">
      <DropdownOption
        name="interval"
        message={I18n.t('pages.classroom.occupation.interval')}
        options={intervals}
        wrapperClassName="event-menu__wrapper"
        textClassName="simple-label__text"
        selectClassName="event-menu__drop-down-select"
        onChange={handleChangeInIntervals}
        curValue={intervals.find(item => item.value === period.interval)}
        isClearable={false}
      />
      {period.interval !== intervalsValue[0] ? (
        <DateRangeSelector
          dateFrom={period.dateFrom}
          dateTo={period.dateTo}
          updateDateFrom={handleChangeInDateFrom}
          updateDateTo={handleChangeInDateTo}
        />
      ) : (
        <FieldWithLabel
          labelValue={I18n.t('components.labels.date')}
          classNameLabel="simple-label simple-label_full"
          classNameField="date-range__date-picker base-field simple-label__input"
          classNameText="simple-label__text"
          type="date"
          value={period.dateFrom}
          onChange={handleChangeInDate}
        />
      )}
      <DropdownOption
        message={I18n.t('components.labels.building')}
        name="buildings"
        options={buildings}
        textClassName="simple-label__text"
        onChange={handleChangeInBuilding}
        curValue={period ? buildings.find(item => item.value === period.buildingNumber) : {}}
        isClearable={false}
      />
      {period.classroom.buildingNumber ? (
        <DropdownOption
          message={I18n.t('components.labels.classroom-number')}
          name="classrooms"
          options={classrooms}
          textClassName="simple-label__text"
          onChange={handleChangeInClassroom}
          curValue={classrooms.find(item => item.value === period.classroomId)}
          isClearable={false}
        />
      ) : null}
      {period.dateFrom && period.dateTo && period.classroomId ? (
        <DropdownOption
          message={I18n.t('components.labels.time')}
          name="timeTo"
          options={times}
          textClassName="simple-label__text"
          onChange={handleChangeInTimeBlock}
          curValue={times.find(item => item.value === period.timeBlockId)}
          isClearable={false}
        />
      ) : null}
    </div>
  );
}

EditPeriodMenu.propTypes = {
  buildings: PropTypes.arrayOf(PropTypes.shape({})),
  classrooms: PropTypes.arrayOf(PropTypes.shape({})),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})),
  period: PropTypes.shape({
    id: PropTypes.number,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    interval: PropTypes.string,
    classroomId: PropTypes.number,
    timeBlockId: PropTypes.number,
    buildingNumber: PropTypes.number,
    classroom: PropTypes.shape({
      buildingNumber: PropTypes.number,
    }),
  }).isRequired,
  updatePeriod: PropTypes.func.isRequired,
  getClassroomsForReschedule: PropTypes.func,
};

EditPeriodMenu.defaultProps = {
  buildings: [],
  classrooms: [],
  events: [],
  timeBlocks: [],
  getClassroomsForReschedule: () => {},
};

const mapStateToProps = state => ({
  buildings: state.buildingReducer.buildings,
  classrooms: state.rescheduleReducer.rescheduleClassrooms,
  events: state.rescheduleReducer.rescheduleEvents,
  timeBlocks: state.timeblocksReducer.timeBlocks,
});

const mapDispatchToProps = dispatch => ({
  getClassroomsForReschedule: bindActionCreators(getClassroomsForRescheduleFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPeriodMenu);
