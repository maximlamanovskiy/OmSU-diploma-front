import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AsideFilter from 'src/components/molecules/asideFilter/AsideFilter';
import Field from 'src/components/atoms/field/Field';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import DropdownOption from 'src/components/molecules/dropdownOption/DropdownOption';

import { getBuildingsFetch } from 'src/actions/buildings/getBuildingsAction';
import { getClassroomsFetch } from 'src/actions/classrooms/getClassrooms';
import { setDateSuccess } from 'src/actions/utility/setDate';
import { clearFilter } from 'src/actions/filter/clearFilter';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';

import './style.scss';

function ClassroomsFilter(props) {
  const {
    date,
    buildingId,
    buildings,
    setDate,
    getBuildings,
    getClassrooms,
    clearFilter: clearFilterAction,
    selectBuilding: selectBuildingAction,
  } = props;

  const [number, setNumber] = useState('');
  const [wasBuildingSet, setBuilding] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    () => () => {
      clearFilterAction();
    },
    [clearFilterAction]
  );

  useEffect(() => {
    getBuildings();
  }, [getBuildings]);

  const handleChangeInDate = event => setDate(event.target.value);
  const handleChangeInNumber = event => setNumber(event.target.value);

  const onBuildingChange = obj => {
    selectBuildingAction(obj ? obj.value : -1);
    setBuilding(!!obj);
  };

  const applyFilter = () => {
    setError(!wasBuildingSet);
    if (!wasBuildingSet) {
      return;
    }
    getClassrooms(buildingId, 0);
  };

  return (
    <AsideFilter
      filterClassName="classrooms-filter"
      buttonValue={I18n.t('components.filter.buttons.apply-classrooms')}
      onClick={applyFilter}
    >
      <Field
        className="classrooms-filter__date-picker base-field"
        type="date"
        value={date}
        onChange={handleChangeInDate}
      />
      <DropdownOption
        message={I18n.t('components.filter.labels.building')}
        name="buildings"
        options={buildings}
        textClassName="simple-label__text"
        onChange={onBuildingChange}
        error={!wasBuildingSet && error}
      />
      <FieldWithLabel
        labelValue={I18n.t('components.filter.labels.classroom-number')}
        classNameLabel="filter__label simple-label"
        classNameField="filter__field base-field simple-label__input"
        classNameText="simple-label__text"
        value={number}
        onChange={handleChangeInNumber}
      />
    </AsideFilter>
  );
}

ClassroomsFilter.propTypes = {
  date: PropTypes.string,
  buildingId: PropTypes.number,
  buildings: PropTypes.arrayOf(PropTypes.shape({})),
  setDate: PropTypes.func,
  clearFilter: PropTypes.func,
  getBuildings: PropTypes.func,
  selectBuilding: PropTypes.func,
  getClassrooms: PropTypes.func,
};

ClassroomsFilter.defaultProps = {
  date: '',
  buildingId: -1,
  buildings: [],
  setDate: () => {},
  clearFilter: () => {},
  getBuildings: () => {},
  selectBuilding: () => {},
  getClassrooms: () => {},
};

const mapStateToProps = state => ({
  date: state.utilityReducer.date,
  buildings: state.buildingReducer.buildings,
  buildingId: state.buildingReducer.selectedId,
});

const mapDispatchToProps = dispatch => ({
  setDate: bindActionCreators(setDateSuccess, dispatch),
  clearFilter: bindActionCreators(clearFilter, dispatch),
  getBuildings: bindActionCreators(getBuildingsFetch, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
  getClassrooms: bindActionCreators(getClassroomsFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomsFilter);
