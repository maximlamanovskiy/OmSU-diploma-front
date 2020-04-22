import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getFacultiesFetch } from 'src/actions/faculties/getFaculties';
import { updateFilter } from 'src/actions/filter/updateFilter';

function FacultyFilterOptions(props) {
  const { error, faculties, updateFilter: updateFilterAction, getFaculties } = props;

  const [wasFacultySelect, setFacultySelect] = useState(false);

  useEffect(() => {
    getFaculties();
  }, [getFaculties]);

  const changeFaculty = obj => {
    updateFilterAction({
      faculty: obj && obj.value,
    });
    setFacultySelect(!!obj);
  };

  return (
    <DropdownOption
      name="faculty"
      options={faculties}
      message={I18n.t('components.filter.labels.faculty')}
      onChange={changeFaculty}
      error={!wasFacultySelect && error}
      textClassName="simple-label__text"
    />
  );
}

FacultyFilterOptions.propTypes = {
  error: PropTypes.bool,
  faculties: PropTypes.arrayOf(PropTypes.shape({})),
  updateFilter: PropTypes.func,
  getFaculties: PropTypes.func,
};

FacultyFilterOptions.defaultProps = {
  error: false,
  faculties: [],
  updateFilter: () => {},
  getFaculties: () => {},
};

const mapStateToProps = state => ({
  faculties: state.facultiesReducer.faculties,
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
  getFaculties: bindActionCreators(getFacultiesFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacultyFilterOptions);
