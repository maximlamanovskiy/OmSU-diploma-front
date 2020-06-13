import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import { checkYear } from 'src/utils/date';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';

export default function AcademicYearScheduleOption(props) {
  const { year, changeYear, error } = props;

  const handleChangeInYear = event => changeYear(event.target.value);

  return (
    <FieldWithLabel
      name="year"
      labelValue={I18n.t('components.schedule-editor-options.labels.academic-years')}
      classNameLabel="filter__label simple-label schedule-editor-options__field"
      classNameField="filter__field base-field simple-label__input"
      classNameText="simple-label__text"
      value={year}
      onChange={handleChangeInYear}
      hasError={error && !checkYear(year)}
    />
  );
}

AcademicYearScheduleOption.propTypes = {
  error: PropTypes.bool.isRequired,
  year: PropTypes.string.isRequired,
  changeYear: PropTypes.func.isRequired,
};
