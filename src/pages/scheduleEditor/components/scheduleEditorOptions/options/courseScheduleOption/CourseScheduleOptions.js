import React from 'react';

import { I18n } from 'react-redux-i18n';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

const courses = [
  { value: 1, label: I18n.t('components.filter.options.courses.first') },
  { value: 2, label: I18n.t('components.filter.options.courses.second') },
  { value: 3, label: I18n.t('components.filter.options.courses.third') },
  { value: 4, label: I18n.t('components.filter.options.courses.fourth') },
  { value: 5, label: I18n.t('components.filter.options.courses.fifth') },
  { value: 6, label: I18n.t('components.filter.options.courses.sixth') },
];

export default function CourseScheduleOptions() {
  return (
    <DropdownOption
      name="course"
      options={courses}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.course')}
      wrapperClassName="schedule-editor-options__field"
    />
  );
}
