import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Checkbox from 'src/components/atoms/checkbox/Checkbox';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import './style.scss';

function LecturerAndRequiredOptions(props) {
  const { required, lecturerId, lecturers, changeRequired, changeLecturerId } = props;

  const handleChangeInRequired = () => changeRequired(!required);
  const handleChangeInLecturer = obj => changeLecturerId(obj ? obj.value : -1);

  return (
    <div className="schedule-item-dialog__options lecturer-and-required-options">
      <DropdownOption
        name="lecturer"
        message={I18n.t('components.labels.lecturer')}
        options={lecturers}
        wrapperClassName="schedule-item-dialog__small-wrapper schedule-item-dialog__drop-down-wrapper"
        textClassName="simple-label__text"
        selectClassName="schedule-item-dialog__drop-down-select"
        onChange={handleChangeInLecturer}
        curValue={lecturers.find(lec => lec.id === lecturerId)}
        isClearable={false}
      />
      <Checkbox
        id="required_item"
        text={I18n.t('components.labels.require')}
        className="schedule-item-dialog__small-wrapper"
        value={required}
        onChange={handleChangeInRequired}
        disabled={false}
      />
    </div>
  );
}

LecturerAndRequiredOptions.propTypes = {
  required: PropTypes.bool.isRequired,
  lecturerId: PropTypes.number.isRequired,
  lecturers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  changeRequired: PropTypes.func.isRequired,
  changeLecturerId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lecturers: state.lecturersReducer.lecturers,
});

export default connect(
  mapStateToProps,
  null
)(LecturerAndRequiredOptions);
