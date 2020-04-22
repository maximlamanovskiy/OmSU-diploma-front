import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getGroupsFetch } from 'src/actions/groups/getGroups';
import { updateFilter } from 'src/actions/filter/updateFilter';
import { clearFilter } from 'src/actions/filter/clearFilter';

import FacultyFilterOptions from '../facultyFilterOptions/FacultyFilterOptions';
import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';

const courses = [
  { value: 1, label: I18n.t('components.filter.options.courses.first') },
  { value: 2, label: I18n.t('components.filter.options.courses.second') },
  { value: 3, label: I18n.t('components.filter.options.courses.third') },
  { value: 4, label: I18n.t('components.filter.options.courses.fourth') },
  { value: 5, label: I18n.t('components.filter.options.courses.fifth') },
  { value: 6, label: I18n.t('components.filter.options.courses.sixth') },
];

function GroupFilterOptions(props) {
  const {
    getGroups,
    clearFilter: clearFilterAction,
    updateFilter: updateFilterAction,
    groups,
    error,
  } = props;

  const [wasGroupSelect, setGroupSelect] = useState(false);
  const [wasCourseSelect, setCourseSelect] = useState(false);

  useEffect(() => {
    getGroups();
    return () => {};
  }, [getGroups, clearFilterAction]);

  const changeGroup = obj => {
    updateFilterAction({
      id: obj && obj.value,
    });
    setGroupSelect(!!obj);
  };

  const changeCourse = obj => {
    updateFilterAction({
      course: obj && obj.value,
    });
    setCourseSelect(!!obj);
  };

  return (
    <React.Fragment>
      <FacultyFilterOptions error={error} />
      <DropdownOption
        name="course"
        options={courses}
        message={I18n.t('components.filter.labels.course')}
        onChange={changeCourse}
        error={!wasCourseSelect && error}
        textClassName="simple-label__text"
      />
      <DropdownOption
        name="group"
        options={groups}
        message={I18n.t('components.filter.labels.group')}
        onChange={changeGroup}
        error={!wasGroupSelect && error}
        textClassName="simple-label__text"
      />
      <YearFilterOptions error={error} />
    </React.Fragment>
  );
}

GroupFilterOptions.propTypes = {
  error: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({})),
  getGroups: PropTypes.func,
  updateFilter: PropTypes.func,
  clearFilter: PropTypes.func,
};

GroupFilterOptions.defaultProps = {
  error: false,
  groups: [],
  getGroups: () => {},
  updateFilter: () => {},
  clearFilter: () => {},
};

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
});

const mapDispatchToProps = dispatch => ({
  getGroups: bindActionCreators(getGroupsFetch, dispatch),
  updateFilter: bindActionCreators(updateFilter, dispatch),
  clearFilter: bindActionCreators(clearFilter, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupFilterOptions);
