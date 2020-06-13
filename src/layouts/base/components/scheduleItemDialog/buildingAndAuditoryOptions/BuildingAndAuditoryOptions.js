import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getBuildingsFetch } from 'src/actions/buildings/getBuildingsAction';
import { getClassroomsForRescheduleFetch } from 'src/actions/classrooms/getClassrooms';

import './style.scss';

function BuildingAndAuditoryOptions(props) {
  const {
    building,
    classroomId,
    buildings,
    classrooms,
    changeBuilding,
    changeClassroomId,
    getClassroomsForReschedule,
  } = props;

  const handleChangeInBuilding = obj => {
    if (obj) {
      getClassroomsForReschedule(obj.value);
      changeBuilding(obj.value);
      changeClassroomId(-1);
    } else {
      changeBuilding(-1);
      changeClassroomId(-1);
    }
  };
  const handleChangeInClassroom = obj => changeClassroomId(obj ? obj.value : -1);

  return (
    <div className="schedule-item-dialog__options building-and-auditory-options">
      <DropdownOption
        message={I18n.t('components.labels.building')}
        name="buildings"
        options={buildings}
        textClassName="simple-label__text"
        wrapperClassName={`schedule-item-dialog__drop-down-wrapper ${
          building !== -1 ? 'schedule-item-dialog__small-wrapper' : ''
        }`}
        selectClassName="schedule-item-dialog__drop-down-select"
        onChange={handleChangeInBuilding}
        curValue={buildings.find(item => item.value === building)}
      />
      {building !== -1 ? (
        <DropdownOption
          message={I18n.t('components.labels.classroom-number')}
          name="classrooms"
          options={classrooms}
          textClassName="simple-label__text"
          wrapperClassName="schedule-item-dialog__small-wrapper schedule-item-dialog__drop-down-wrapper"
          selectClassName="schedule-item-dialog__drop-down-select"
          onChange={handleChangeInClassroom}
          curValue={classrooms.find(item => item.value === classroomId)}
        />
      ) : null}
    </div>
  );
}

BuildingAndAuditoryOptions.propTypes = {
  building: PropTypes.number.isRequired,
  classroomId: PropTypes.number.isRequired,
  buildings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classrooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  changeBuilding: PropTypes.func.isRequired,
  changeClassroomId: PropTypes.func.isRequired,
  getClassroomsForReschedule: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  buildings: state.buildingReducer.buildings,
  classrooms: state.rescheduleReducer.rescheduleClassrooms,
});

const mapDispatchToProps = dispatch => ({
  getBuildings: bindActionCreators(getBuildingsFetch, dispatch),
  getClassroomsForReschedule: bindActionCreators(getClassroomsForRescheduleFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingAndAuditoryOptions);
