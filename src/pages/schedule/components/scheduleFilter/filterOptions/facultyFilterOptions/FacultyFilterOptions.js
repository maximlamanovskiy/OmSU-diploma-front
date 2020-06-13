import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getFacultiesFetch } from 'src/actions/faculties/getFaculties';
import { getCoursesFetch } from 'src/actions/courses/getCourses';
import { clearCourses } from 'src/actions/courses/utility';

function FacultyFilterOptions(props) {
  const { faculties, getFaculties, getCourses, error, clearCourses: clearCoursesAction } = props;

  const [wasCourseSelect, setCourseSelect] = useState(false);

  useEffect(() => {
    getFaculties();
    return () => {
      clearCoursesAction();
    };
  }, [getFaculties, clearCoursesAction]);

  const changeFaculty = obj => {
    clearCoursesAction();
    if (obj) {
      getCourses(obj.value);
    }
    setCourseSelect(!!obj);
  };

  return (
    <DropdownOption
      name="faculty"
      options={faculties}
      message={I18n.t('components.filter.labels.faculty')}
      onChange={changeFaculty}
      textClassName="simple-label__text"
      isClearable={false}
      error={!wasCourseSelect && error}
    />
  );
}

FacultyFilterOptions.propTypes = {
  error: PropTypes.bool.isRequired,
  faculties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCourses: PropTypes.func.isRequired,
  getFaculties: PropTypes.func.isRequired,
  clearCourses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  faculties: state.facultiesReducer.faculties,
});

const mapDispatchToProps = dispatch => ({
  getFaculties: bindActionCreators(getFacultiesFetch, dispatch),
  getCourses: bindActionCreators(getCoursesFetch, dispatch),
  clearCourses: bindActionCreators(clearCourses, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacultyFilterOptions);
