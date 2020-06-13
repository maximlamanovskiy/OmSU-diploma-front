import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

function CourseScheduleOptions(props) {
  const { courses, course, changeCourse, error } = props;

  const handleChangInCourse = obj => changeCourse(obj ? obj.value : -1);

  return (
    <DropdownOption
      name="course"
      options={courses}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.course')}
      wrapperClassName="schedule-editor-options__field"
      onChange={handleChangInCourse}
      curValue={courses.find(item => item.id === course)}
      error={course === -1 && error}
    />
  );
}

CourseScheduleOptions.propTypes = {
  error: PropTypes.bool.isRequired,
  course: PropTypes.number.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  changeCourse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.coursesReducer.courses,
});

export default connect(
  mapStateToProps,
  null
)(CourseScheduleOptions);
