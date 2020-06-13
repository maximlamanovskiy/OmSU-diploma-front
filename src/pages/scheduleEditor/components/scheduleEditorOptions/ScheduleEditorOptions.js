import React from 'react';
import PropTypes from 'prop-types';

import FacultyScheduleOptions from './options/facultyScheduleOption/FacultyScheduleOptions';
import AcademicYearScheduleOption from './options/academicYearScheduleOption/AcademicYearScheduleOption';
import SemesterScheduleOption from './options/semestrScheduleOption/SemesterScheduleOption';
import CourseScheduleOptions from './options/courseScheduleOption/CourseScheduleOptions';

import './style.scss';

export default function ScheduleEditorOptions(props) {
  const { year, changeSemester, changeYear, course, changeCourse, error } = props;

  return (
    <header className="schedule-editor-options">
      <FacultyScheduleOptions error={error} />
      <CourseScheduleOptions course={course} changeCourse={changeCourse} error={error} />
      <AcademicYearScheduleOption year={year} changeYear={changeYear} error={error} />
      <SemesterScheduleOption changeSemester={changeSemester} error={error} />
    </header>
  );
}

ScheduleEditorOptions.propTypes = {
  error: PropTypes.bool.isRequired,
  course: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  changeSemester: PropTypes.func.isRequired,
  changeYear: PropTypes.func.isRequired,
  changeCourse: PropTypes.func.isRequired,
};
