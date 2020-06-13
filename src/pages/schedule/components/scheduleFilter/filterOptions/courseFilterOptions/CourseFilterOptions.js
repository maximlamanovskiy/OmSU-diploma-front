import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { updateFilter } from 'src/actions/filter/updateFilter';

import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';
import FacultyFilterOptions from '../facultyFilterOptions/FacultyFilterOptions';

function CourseFilterOptions(props) {
  const { error, updateFilter: updateFilterAction, courses, courseId } = props;

  const changeCourse = obj => updateFilterAction({ id: obj ? obj.value : null });

  return (
    <React.Fragment>
      <FacultyFilterOptions error={error} />
      <DropdownOption
        name="course"
        options={courses}
        message={I18n.t('components.filter.labels.course')}
        onChange={changeCourse}
        error={!courseId && error}
        textClassName="simple-label__text"
        curValue={courses.find(item => item.value === courseId)}
      />
      <YearFilterOptions error={error} />
    </React.Fragment>
  );
}

CourseFilterOptions.propTypes = {
  error: PropTypes.bool.isRequired,
  updateFilter: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  courseId: PropTypes.number,
};

CourseFilterOptions.defaultProps = {
  courseId: null,
};

const mapStateToProps = state => ({
  courses: state.coursesReducer.courses,
  courseId: state.filterReducer.filter.id,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseFilterOptions);
