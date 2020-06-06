import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AsideFilter from 'src/components/molecules/asideFilter/AsideFilter';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { clearFilter } from 'src/actions/filter/clearFilter';
import { getScheduleFetch } from 'src/actions/schedule/getSchedule';
import { updateScheduleType } from 'src/actions/schedule/updateType';

import GroupFilterOptions from './filterOptions/groupFilterOptions/GroupFilterOptions';
import LecturerFilterOptions from './filterOptions/lecturerFilterOptions/LecturerFilterOptions';
import CourseFilterOptions from './filterOptions/courseFilterOptions/CourseFilterOptions';

import './style.scss';

const firstOptions = [
  { value: 1, label: I18n.t('components.filter.options.which-schedule.group') },
  { value: 2, label: I18n.t('components.filter.options.which-schedule.course') },
  { value: 3, label: I18n.t('components.filter.options.which-schedule.lecturer') },
];

const checkYear = year => year && year.match('^2\\d{3}/2\\d{3}$');
const checkErrors = filter => !(checkYear(filter.year) && filter.semester && filter.id);

const types = ['groups', 'course', 'lecturers'];

function ScheduleFilter(props) {
  const [filterPattern, changeFilterPattern] = useState(0);
  const [showError, setShowError] = useState(false);

  const {
    filter,
    clearFilter: clearFilterAction,
    getSchedule,
    className,
    isClose,
    updateScheduleType: updateScheduleTypeAction,
  } = props;

  useEffect(
    () => () => {
      clearFilterAction();
    },
    [clearFilterAction]
  );

  const firstSelect = obj => {
    clearFilterAction();
    setShowError(false);
    changeFilterPattern(obj ? obj.value : 0);
  };

  const applyFilter = () => {
    if (!filterPattern || checkErrors(filter)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    updateScheduleTypeAction(types[filterPattern - 1]);
    getSchedule({
      ...filter,
      type: types[filterPattern - 1],
    });
  };

  return (
    <AsideFilter
      filterClassName={`schedule-filter ${className}`}
      buttonDisabled={!filterPattern}
      buttonValue={I18n.t('components.buttons.apply-filter')}
      onClick={applyFilter}
      isClose={isClose}
    >
      <DropdownOption
        name="schedule-type"
        options={firstOptions}
        message={I18n.t('components.filter.labels.which-schedule')}
        textClassName="simple-label__text"
        onChange={firstSelect}
      />
      {filterPattern === 1 && <GroupFilterOptions error={showError} />}
      {filterPattern === 2 && <CourseFilterOptions error={showError} />}
      {filterPattern === 3 && <LecturerFilterOptions error={showError} />}
    </AsideFilter>
  );
}

ScheduleFilter.propTypes = {
  className: PropTypes.string,
  isClose: PropTypes.bool,
  filter: PropTypes.shape({
    id: PropTypes.any,
    faculty: PropTypes.any,
    year: PropTypes.any,
    semester: PropTypes.any,
  }),
  clearFilter: PropTypes.func,
  getSchedule: PropTypes.func,
  updateScheduleType: PropTypes.func,
};

ScheduleFilter.defaultProps = {
  className: '',
  isClose: false,
  filter: {},
  clearFilter: () => {},
  getSchedule: () => {},
  updateScheduleType: () => {},
};

const mapStateToProps = state => ({
  faculties: state.facultiesReducer.faculties,
  filter: state.filterReducer.filter,
});

const mapDispatchToProps = dispatch => ({
  clearFilter: bindActionCreators(clearFilter, dispatch),
  getSchedule: bindActionCreators(getScheduleFetch, dispatch),
  updateScheduleType: bindActionCreators(updateScheduleType, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleFilter);
