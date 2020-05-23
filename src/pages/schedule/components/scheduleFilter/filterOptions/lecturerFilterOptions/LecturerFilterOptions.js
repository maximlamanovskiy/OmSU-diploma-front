import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getLecturersOptions } from 'src/actions/filter/lectureOptions';
import { updateFilter } from 'src/actions/filter/updateFilter';

import YearFilterOptions from '../yearFilterOptions/YearFilterOptions';

function LecturerFilterOptions(props) {
  const {
    getLecturersOptions: getLecturersOptionsAction,
    updateFilter: updateFilterAction,
    lecturers,
    error,
  } = props;

  const [wasLecturerSelect, setLecturerSelect] = useState(false);

  useEffect(() => {
    getLecturersOptionsAction();
  }, [getLecturersOptionsAction]);

  const changeLecturer = obj => {
    updateFilterAction({
      id: obj && obj.value,
    });
    setLecturerSelect(!!obj);
  };

  return (
    <React.Fragment>
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
  lecturers: PropTypes.arrayOf(PropTypes.shape({})),
  getLecturersOptions: PropTypes.func,
  updateFilter: PropTypes.func,
};

LecturerFilterOptions.defaultProps = {
  error: false,
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
