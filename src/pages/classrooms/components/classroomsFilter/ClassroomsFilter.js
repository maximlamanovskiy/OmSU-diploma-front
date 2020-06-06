import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AsideFilter from 'src/components/molecules/asideFilter/AsideFilter';
import Field from 'src/components/atoms/field/Field';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getBuildingsFetch } from 'src/actions/buildings/getBuildingsAction';
import { getClassroomsFetch } from 'src/actions/classrooms/getClassrooms';
import { setDateSuccess } from 'src/actions/utility/setDate';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';
import { clearClassroomsEvents, setPage } from 'src/actions/classrooms/utility';

import './style.scss';

function ClassroomsFilter(props) {
  const {
    date,
    buildingId,
    buildings,
    setDate,
    getBuildings,
    getClassrooms,
    selectBuilding: selectBuildingAction,
    clearClassroomsEvents: clearClassroomsEventsAction,
    setPage: setPageAction,
  } = props;

  const [filterBuilding, setFilterBuilding] = useState(buildingId);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBuildings();
  }, [getBuildings]);

  const handleChangeInDate = event => {
    const { value } = event.target;
    clearClassroomsEventsAction();
    setDate(value, value, value);
  };

  const onBuildingChange = obj => {
    setError(false);
    setFilterBuilding(obj ? obj.value : null);
  };

  const applyFilter = () => {
    if (!filterBuilding) {
      setError(true);
      return;
    }
    setPageAction(1);
    clearClassroomsEventsAction();
    selectBuildingAction(filterBuilding);
    getClassrooms(filterBuilding, 0);
  };

  return (
    <AsideFilter
      filterClassName="classrooms-filter"
      buttonValue={I18n.t('components.buttons.apply-filter')}
      onClick={applyFilter}
    >
      <Field
        className="classrooms-filter__date-picker base-field"
        type="date"
        value={date}
        onChange={handleChangeInDate}
      />
      <div className="classrooms-filter__delimiter" />
      <DropdownOption
        message={I18n.t('components.labels.building')}
        name="buildings"
        options={buildings}
        textClassName="simple-label__text"
        onChange={onBuildingChange}
        error={!filterBuilding && error}
        curValue={buildings.find(item => item.value === buildingId)}
      />
    </AsideFilter>
  );
}

ClassroomsFilter.propTypes = {
  date: PropTypes.string,
  buildingId: PropTypes.number,
  buildings: PropTypes.arrayOf(PropTypes.shape({})),
  setDate: PropTypes.func,
  getBuildings: PropTypes.func,
  selectBuilding: PropTypes.func,
  getClassrooms: PropTypes.func,
  clearClassroomsEvents: PropTypes.func,
  setPage: PropTypes.func,
};

ClassroomsFilter.defaultProps = {
  date: '',
  buildingId: -1,
  buildings: [],
  setDate: () => {},
  getBuildings: () => {},
  selectBuilding: () => {},
  getClassrooms: () => {},
  clearClassroomsEvents: () => {},
  setPage: () => {},
};

const mapStateToProps = state => ({
  date: state.utilityReducer.date,
  buildings: state.buildingReducer.buildings,
  buildingId: state.buildingReducer.selectedId,
});

const mapDispatchToProps = dispatch => ({
  setDate: bindActionCreators(setDateSuccess, dispatch),
  getBuildings: bindActionCreators(getBuildingsFetch, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
  getClassrooms: bindActionCreators(getClassroomsFetch, dispatch),
  clearClassroomsEvents: bindActionCreators(clearClassroomsEvents, dispatch),
  setPage: bindActionCreators(setPage, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomsFilter);
