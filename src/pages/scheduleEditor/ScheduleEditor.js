import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Button from 'src/components/atoms/button/Button';

import { clearClassrooms } from 'src/actions/classrooms/utility';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';
import { checkUserFetch } from 'src/actions/user/whoAmI';

import ScheduleEditorOptions from './components/scheduleEditorOptions/ScheduleEditorOptions';

import './style.scss';

function ScheduleEditor(props) {
  const {
    clearClassrooms: clearClassroomsAction,
    selectBuilding: selectBuildingAction,
    checkUser,
  } = props;

  useEffect(() => {
    clearClassroomsAction();
    selectBuildingAction(null);
    checkUser();
  }, [clearClassroomsAction, selectBuildingAction, checkUser]);

  const editSchedule = () => {};

  return (
    <div className="schedule-editor">
      <ScheduleEditorOptions />
      <Button
        className="action-button schedule-editor__button"
        onClick={editSchedule}
        value={I18n.t('components.buttons.edit')}
      />
    </div>
  );
}

ScheduleEditor.propTypes = {
  clearClassrooms: PropTypes.func,
  selectBuilding: PropTypes.func,
  checkUser: PropTypes.func,
};

ScheduleEditor.defaultProps = {
  clearClassrooms: () => {},
  selectBuilding: () => {},
  checkUser: () => {},
};

const mapDispatchToProps = dispatch => ({
  clearClassrooms: bindActionCreators(clearClassrooms, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ScheduleEditor);
