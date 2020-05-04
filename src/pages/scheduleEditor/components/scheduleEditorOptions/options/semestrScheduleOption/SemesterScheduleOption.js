import React from 'react';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';
import { I18n } from 'react-redux-i18n';

const semesters = [{ label: 1, value: 1 }, { label: 2, value: 2 }];

export default function SemesterScheduleOption() {
  return (
    <DropdownOption
      name="semester"
      options={semesters}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.semester')}
      wrapperClassName="schedule-editor-options__field"
    />
  );
}
