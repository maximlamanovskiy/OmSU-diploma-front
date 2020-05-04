import React, { useState } from 'react';

import { I18n } from 'react-redux-i18n';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';

export default function AcademicYearScheduleOption() {
  const [year, setYear] = useState('');

  const changeYear = event => {
    setYear(event.target.value);
  };

  return (
    <FieldWithLabel
      name="year"
      labelValue={I18n.t('components.schedule-editor-options.labels.academic-years')}
      classNameLabel="filter__label simple-label schedule-editor-options__field"
      classNameField="filter__field base-field simple-label__input"
      classNameText="simple-label__text"
      value={year}
      onChange={changeYear}
    />
  );
}
