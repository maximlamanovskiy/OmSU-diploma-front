import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { updateFilter } from 'src/actions/filter/updateFilter';

const semester = [{ value: 1, label: 1 }, { value: 2, label: 2 }];

function YearFilterOptions(props) {
  const { error, updateFilter: updateFilterAction } = props;

  const [year, setYear] = useState('');
  const [wasSemesterSelect, setSemesterSelect] = useState(false);

  const changeYear = event => {
    const { value } = event.target;
    updateFilterAction({
      year: value,
    });
    setYear(value);
  };

  const changeSemester = obj => {
    updateFilterAction({
      semester: obj && obj.value,
    });
    setSemesterSelect(!!obj);
  };

  return (
    <React.Fragment>
      <FieldWithLabel
        name="year"
        labelValue={I18n.t('components.filter.labels.year')}
        classNameLabel="filter__label simple-label"
        classNameField="filter__field base-field simple-label__input"
        classNameText="simple-label__text"
        value={year}
        onChange={changeYear}
        hasError={!!year && error}
      />
      <DropdownOption
        name="semester"
        options={semester}
        message={I18n.t('components.filter.labels.semester')}
        onChange={changeSemester}
        error={!wasSemesterSelect && error}
        textClassName="simple-label__text"
      />
    </React.Fragment>
  );
}

YearFilterOptions.propTypes = {
  error: PropTypes.bool,
  updateFilter: PropTypes.func,
};

YearFilterOptions.defaultProps = {
  error: false,
  updateFilter: () => {},
};

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(YearFilterOptions);
