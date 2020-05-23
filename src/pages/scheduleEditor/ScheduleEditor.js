import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Button from 'src/components/atoms/button/Button';

import { clearClassrooms } from 'src/actions/classrooms/utility';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';

import ScheduleEditorOptions from './components/scheduleEditorOptions/ScheduleEditorOptions';

import './style.scss';

function ScheduleEditor(props) {
  const { clearClassrooms: clearClassroomsAction, selectBuilding: selectBuildingAction } = props;

  useEffect(() => {
    clearClassroomsAction();
    selectBuildingAction(null);
  }, [clearClassroomsAction, selectBuildingAction]);

  const editSchedule = () => {};

  return (
    <div className="schedule-editor">
      <ScheduleEditorOptions />
      <Button
        className="action-button schedule-editor__button"
        onClick={editSchedule}
        value={I18n.t('page.schedule-editor.buttons.edit')}
      />
    </div>
  );
}

ScheduleEditor.propTypes = {
  clearClassrooms: PropTypes.func,
  selectBuilding: PropTypes.func,
};

ScheduleEditor.defaultProps = {
  clearClassrooms: () => {},
  selectBuilding: () => {},
};

const mapDispatchToProps = dispatch => ({
  clearClassrooms: bindActionCreators(clearClassrooms, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(ScheduleEditor);
