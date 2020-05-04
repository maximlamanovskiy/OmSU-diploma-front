import React from 'react';

import GroupScheduleOptions from './options/groupScheduleOption/GroupScheduleOptions';
import AcademicYearScheduleOption from './options/academicYearScheduleOption/AcademicYearScheduleOption';
import SemesterScheduleOption from './options/semestrScheduleOption/SemesterScheduleOption';
import CourseScheduleOptions from './options/courseScheduleOption/CourseScheduleOptions';

import './style.scss';

export default function ScheduleEditorOptions() {
  return (
    <header className="schedule-editor-options">
      <GroupScheduleOptions />
      <CourseScheduleOptions />
      <AcademicYearScheduleOption />
      <SemesterScheduleOption />
    </header>
  );
}
