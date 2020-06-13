import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Button from 'src/components/atoms/button/Button';

import { clearClassrooms } from 'src/actions/classrooms/utility';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';
import { checkUserFetch } from 'src/actions/user/whoAmI';
import { editScheduleFetch } from 'src/actions/schedule/editSchedule';
import { getTimeBlocksFetch } from 'src/actions/timeBlocks/getTimeBlocks';
import { getLecturersFetch } from 'src/actions/lecturers/getLecturers';
import { getDisciplinesFetch } from 'src/actions/discipline/getDisciplines';
import { setScheduleEditorOpen } from 'src/actions/utility/setScheduleEditorOpen';
import { checkYear } from 'src/utils/date';

import ScheduleEditorOptions from './components/scheduleEditorOptions/ScheduleEditorOptions';
import Editor from './components/editor/Editor';

import './style.scss';

function ScheduleEditor(props) {
  const {
    clearClassrooms: clearClassroomsAction,
    selectBuilding: selectBuildingAction,
    setScheduleEditorOpen: setScheduleEditorOpenAction,
    checkUser,
    editSchedule,
    getTimeBlocks,
    getDisciplines,
    getLecturers,
    isOpen,
  } = props;

  const [year, changeYear] = useState('2019/2020');
  const [semester, changeSemester] = useState(0);
  const [course, changeCourse] = useState(-1);
  const [error, changeError] = useState(false);

  useEffect(() => {
    checkUser();
    clearClassroomsAction();
    selectBuildingAction(null);
    getTimeBlocks();
    getDisciplines();
    getLecturers();
  }, [
    clearClassroomsAction,
    selectBuildingAction,
    checkUser,
    getTimeBlocks,
    getDisciplines,
    getLecturers,
  ]);

  const clickEdit = () => {
    checkUser();
    if (semester && checkYear(year) && course !== -1) {
      editSchedule(course, semester, year);
    }
    changeError(!(semester && checkYear(year) && course !== -1));
  };

  const goBack = () => setScheduleEditorOpenAction(false);

  const value = isOpen ? I18n.t('components.buttons.back') : I18n.t('components.buttons.create');

  return (
    <div className="schedule-editor">
      {isOpen ? (
        <Editor />
      ) : (
        <ScheduleEditorOptions
          year={year}
          changeYear={changeYear}
          changeSemester={changeSemester}
          course={course}
          changeCourse={changeCourse}
          error={error}
        />
      )}
      <Button
        className="action-button schedule-editor__button"
        onClick={isOpen ? goBack : clickEdit}
        value={value}
      />
    </div>
  );
}

ScheduleEditor.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  clearClassrooms: PropTypes.func.isRequired,
  selectBuilding: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  editSchedule: PropTypes.func.isRequired,
  getTimeBlocks: PropTypes.func.isRequired,
  getLecturers: PropTypes.func.isRequired,
  getDisciplines: PropTypes.func.isRequired,
  setScheduleEditorOpen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpen: state.utilityReducer.isScheduleEditorOpen,
});

const mapDispatchToProps = dispatch => ({
  clearClassrooms: bindActionCreators(clearClassrooms, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  editSchedule: bindActionCreators(editScheduleFetch, dispatch),
  getTimeBlocks: bindActionCreators(getTimeBlocksFetch, dispatch),
  getLecturers: bindActionCreators(getLecturersFetch, dispatch),
  getDisciplines: bindActionCreators(getDisciplinesFetch, dispatch),
  setScheduleEditorOpen: bindActionCreators(setScheduleEditorOpen, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleEditor);
