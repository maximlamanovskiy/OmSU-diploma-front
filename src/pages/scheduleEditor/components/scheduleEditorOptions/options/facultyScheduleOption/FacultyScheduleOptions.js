import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getFacultiesFetch } from 'src/actions/faculties/getFaculties';
import { getCoursesFetch } from 'src/actions/courses/getCourses';
import { clearCourses } from 'src/actions/courses/utility';

function FacultyScheduleOptions(props) {
  const { faculties, getFaculties, getCourses, error, clearCourses: clearCoursesAction } = props;

  const [wasSelected, setSelected] = useState(false);

  useEffect(() => {
    getFaculties();
    return () => {
      clearCoursesAction();
    };
  }, [getFaculties, clearCoursesAction]);

  const handleChangeInFaculties = obj => {
    clearCoursesAction();
    if (obj) {
      getCourses(obj ? obj.value : 0);
    }
    setSelected(!!obj);
  };

  return (
    <DropdownOption
      name="faculty"
      options={faculties}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.faculty')}
      wrapperClassName="schedule-editor-options__field"
      onChange={handleChangeInFaculties}
      isClearable={false}
      error={error && !wasSelected}
    />
  );
}

FacultyScheduleOptions.propTypes = {
  error: PropTypes.bool.isRequired,
  faculties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getFaculties: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
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
)(FacultyScheduleOptions);
