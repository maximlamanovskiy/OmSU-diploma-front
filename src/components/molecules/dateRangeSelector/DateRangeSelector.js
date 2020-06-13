import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';

import './style.scss';

export default function DateRangeSelector(props) {
  const {
    dateFrom,
    dateTo,
    updateDateFrom,
    updateDateTo,
    disabled,
    error,
    labelClassname,
    fieldClassname,
  } = props;

  const handleChangeInStartDate = event => {
    const date = event.target.value;
    updateDateFrom(date);
    if (dateTo < date) {
      updateDateTo(date);
    }
  };
  const handleChangeInEndDate = event => {
    const date = event.target.value;
    updateDateTo(date);
    if (dateFrom > date) {
      updateDateFrom(date);
    }
  };

  return (
    <div className="date-range">
      <FieldWithLabel
        labelValue={I18n.t('components.date-range-selector.start-date')}
        classNameLabel="simple-label"
        classNameField={`date-range__date-picker base-field simple-label__input ${fieldClassname}`}
        classNameText={`simple-label__text ${labelClassname}`}
        type="date"
        value={dateFrom}
        onChange={handleChangeInStartDate}
        disabled={disabled}
        hasError={!dateFrom && error}
      />
      <FieldWithLabel
        labelValue={I18n.t('components.date-range-selector.end-date')}
        classNameLabel="simple-label"
        classNameField={`date-range__date-picker base-field simple-label__input ${fieldClassname}`}
        classNameText={`simple-label__text ${labelClassname}`}
        type="date"
        value={dateTo}
        onChange={handleChangeInEndDate}
        disabled={disabled}
        hasError={!dateTo && error}
      />
    </div>
  );
}

DateRangeSelector.propTypes = {
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  labelClassname: PropTypes.string,
  fieldClassname: PropTypes.string,
  updateDateFrom: PropTypes.func.isRequired,
  updateDateTo: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

DateRangeSelector.defaultProps = {
  dateFrom: '',
  dateTo: '',
  labelClassname: '',
  fieldClassname: '',
};

DateRangeSelector.defaultProps = {
  disabled: false,
  error: false,
};
