import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getLecturersOptions } from 'src/actions/filter/lectureOptions';
import { updateFilter } from 'src/actions/filter/updateFilter';
import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';
import FacultyFilterOptions from '../facultyFilterOptions/FacultyFilterOptions';

function LecturerFilterOptions(props) {
  const {
    getLecturersOptions: getLecturersOptionsAction,
    updateFilter: updateFilterAction,
    lecturers,
    departments,
    error,
  } = props;

  const [wasDepartmentSelect, setDepartmentSelect] = useState(false);
  const [wasLecturerSelect, setLecturerSelect] = useState(false);

  useEffect(() => {
    getLecturersOptionsAction();
  }, [getLecturersOptionsAction]);

  const changeDepartments = obj => {
    updateFilterAction({
      department: obj && obj.value,
    });
    setDepartmentSelect(!!obj);
  };

  const changeLecturer = obj => {
    updateFilterAction({
      id: obj && obj.value,
    });
    setLecturerSelect(!!obj);
  };

  return (
    <React.Fragment>
      <FacultyFilterOptions error={error} />
      <DropdownOption
        name="department"
        message={I18n.t('components.filter.labels.department')}
        options={departments}
        onChange={changeDepartments}
        error={!wasDepartmentSelect && error}
        textClassName="simple-label__text"
      />
      <DropdownOption
        name="lecturer"
        message={I18n.t('components.filter.labels.lecturer')}
        options={lecturers}
        onChange={changeLecturer}
        error={!wasLecturerSelect && error}
        textClassName="simple-label__text"
      />
      <YearFilterOptions error={error} />
    </React.Fragment>
  );
}

LecturerFilterOptions.propTypes = {
  error: PropTypes.bool,
  departments: PropTypes.arrayOf(PropTypes.shape({})),
  lecturers: PropTypes.arrayOf(PropTypes.shape({})),
  getLecturersOptions: PropTypes.func,
  updateFilter: PropTypes.func,
};

LecturerFilterOptions.defaultProps = {
  error: false,
  departments: [],
  lecturers: [],
  getLecturersOptions: () => {},
  updateFilter: () => {},
};

const mapStateToProps = state => ({
  departments: state.departmentsReducer.departments,
  lecturers: state.lecturersReducer.lecturers,
});

const dispatchToProps = dispatch => ({
  getLecturersOptions: bindActionCreators(getLecturersOptions, dispatch),
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export default connect(
  mapStateToProps,
  dispatchToProps
)(LecturerFilterOptions);
