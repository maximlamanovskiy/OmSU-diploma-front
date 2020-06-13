import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';

import Button from 'src/components/atoms/button/Button';

import { openScheduleItemDialogWindow } from 'src/actions/utility/dialogWindow';
import { selectGroup } from 'src/actions/groups/utility';

import ScheduleItemCompact from '../scheduleItemCompact/ScheduleItemCompact';

import './style.scss';

function EditorItems(props) {
  const {
    openScheduleItemDialogWindow: openScheduleItemDialogWindowAction,
    selectGroup: selectGroupAction,
    group,
    schedules,
  } = props;

  const renderItems = () =>
    schedules[group.name].schedule.map(item => (
      <li key={item} className="schedule-item-list__list-item">
        <ScheduleItemCompact scheduleItem={item} />
      </li>
    ));

  const handleOnClick = () => {
    selectGroupAction(group.id);
    openScheduleItemDialogWindowAction();
  };

  return (
    <div className="editor-item">
      <ul className="editor-item__schedule-item-list">{renderItems()}</ul>
      <Button
        className="action-button editor-item__add-new"
        onClick={handleOnClick}
        value={I18n.t('components.buttons.create')}
      />
    </div>
  );
}

EditorItems.propTypes = {
  openScheduleItemDialogWindow: PropTypes.func,
  selectGroup: PropTypes.func,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  schedules: PropTypes.shape({}),
};

EditorItems.defaultProps = {
  openScheduleItemDialogWindow: () => {},
  selectGroup: () => {},
  schedules: {},
};

const mapStateToProps = state => ({
  schedules: state.scheduleReducer.editingSchedule.schedules,
});

const mapDispatchToProps = dispatch => ({
  openScheduleItemDialogWindow: bindActionCreators(openScheduleItemDialogWindow, dispatch),
  selectGroup: bindActionCreators(selectGroup, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorItems);
