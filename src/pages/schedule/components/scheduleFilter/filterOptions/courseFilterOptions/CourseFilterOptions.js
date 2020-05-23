import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { updateFilter } from 'src/actions/filter/updateFilter';

import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';

const courses = [
  { value: 1, label: I18n.t('components.filter.options.courses.first') },
  { value: 2, label: I18n.t('components.filter.options.courses.second') },
  { value: 3, label: I18n.t('components.filter.options.courses.third') },
  { value: 4, label: I18n.t('components.filter.options.courses.fourth') },
  { value: 5, label: I18n.t('components.filter.options.courses.fifth') },
  { value: 6, label: I18n.t('components.filter.options.courses.sixth') },
];

function CourseFilterOptions(props) {
  const { error, updateFilter: updateFilterAction } = props;

  const [wasCourseSelect, setCourseSelect] = useState(false);

  const changeCourse = obj => {
    updateFilterAction({
      id: obj && obj.value,
    });
    setCourseSelect(!!obj);
  };

  return (
    <React.Fragment>
      <DropdownOption
        name="course"
        options={courses}
        message={I18n.t('components.filter.labels.course')}
        onChange={changeCourse}
        error={!wasCourseSelect && error}
        textClassName="simple-label__text"
      />
      <YearFilterOptions error={error} />
    </React.Fragment>
  );
}

CourseFilterOptions.propTypes = {
  error: PropTypes.bool,
  updateFilter: PropTypes.func,
};

CourseFilterOptions.defaultProps = {
  error: false,
  updateFilter: () => {},
};

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(CourseFilterOptions);
