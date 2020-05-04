import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getFacultiesFetch } from 'src/actions/faculties/getFaculties';

function GroupScheduleOptions(props) {
  const { faculties, getFaculties } = props;

  useEffect(() => {
    getFaculties();
  }, [getFaculties]);

  return (
    <DropdownOption
      name="faculty"
      options={faculties}
      textClassName="simple-label__text"
      message={I18n.t('components.schedule-editor-options.labels.faculty')}
      wrapperClassName="schedule-editor-options__field"
    />
  );
}

GroupScheduleOptions.propTypes = {
  faculties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getFaculties: PropTypes.func,
};

GroupScheduleOptions.defaultProps = {
  getFaculties: () => {},
};

const mapStateToProps = state => ({
  faculties: state.facultiesReducer.faculties,
});

const mapDispatchToProps = dispatch => ({
  getFaculties: bindActionCreators(getFacultiesFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupScheduleOptions);
