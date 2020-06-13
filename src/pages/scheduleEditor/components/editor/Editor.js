import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setGroups } from 'src/actions/groups/utility';

import EditorHeader from '../editorHeader/EditorHeader';
import EditorItems from '../editorItems/EditorItems';

import './style.scss';

function Editor(props) {
  const { editingSchedule, setGroups: setGroupsAction } = props;

  const scheduleEditorStyle = {
    gridTemplateColumns: `repeat(${
      editingSchedule ? editingSchedule.course.groups.length : 1
    }, 2fr)`,
    gridTemplateRows: 'auto',
  };

  const groups = editingSchedule ? editingSchedule.course.groups : [];

  useEffect(() => {
    setGroupsAction(
      editingSchedule
        ? editingSchedule.course.groups.map(group => ({
            ...group,
            label: group.name,
            value: group.id,
          }))
        : []
    );
  }, [setGroupsAction, editingSchedule]);

  const renderScheduleItems = () =>
    groups.map(group => <EditorItems key={group.id} group={group} />);

  return (
    <div className="editor">
      <EditorHeader groups={groups} style={scheduleEditorStyle} />
      <div className="editor__items" style={scheduleEditorStyle}>
        {renderScheduleItems()}
      </div>
    </div>
  );
}

Editor.propTypes = {
  editingSchedule: PropTypes.shape({
    course: PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    schedules: PropTypes.shape({}),
  }),
  setGroups: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  editingSchedule: null,
};

const mapStateToProps = state => ({
  editingSchedule: state.scheduleReducer.editingSchedule,
});

const mapDispatchToProps = dispatch => ({
  setGroups: bindActionCreators(setGroups, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
