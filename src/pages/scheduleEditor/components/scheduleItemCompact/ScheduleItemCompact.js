import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Message from 'src/components/atoms/message/Message';
import Button from 'src/components/atoms/button/Button';

import { deleteScheduleItemFetch } from 'src/actions/schedule/deleteScheduleItem';
import { selectScheduleItem } from 'src/actions/schedule/utility';
import { openScheduleItemDialogWindow } from 'src/actions/utility/dialogWindow';

import PeriodInfo from '../periodInfo/PeriodInfo';

import './style.scss';

function ScheduleItemCompact(props) {
  const {
    scheduleItem,
    timeBlocks,
    lecturers,
    disciplines,
    deleteScheduleItem,
    selectScheduleItem: selectScheduleItemAction,
    openScheduleItemDialogWindow: openScheduleItemDialogWindowAction,
  } = props;

  const renderPeriods = () =>
    scheduleItem.event.periods.map(period => (
      <li key={`${period}`} className="periods-list__item">
        <PeriodInfo
          period={period}
          timeBlock={timeBlocks.find(item => item.id === period.timeBlockId)}
        />
      </li>
    ));

  const handleClickDelete = () => deleteScheduleItem(scheduleItem.id);
  const handleClickEdit = () => {
    selectScheduleItemAction({ ...scheduleItem });
    openScheduleItemDialogWindowAction();
  };
  const lecturer = lecturers.find(lec => lec.id === scheduleItem.event.lecturerId);

  return (
    <div className="schedule-item-compact">
      <div className="schedule-item-compact__control-item">
        <Button
          className="icon-button icon-button_small schedule-item-compact__delete"
          onClick={handleClickDelete}
        />
        <Message
          className="schedule-item-compact__message"
          value={`${lecturer.firstName[0]}.${lecturer.patronymic[0]}.${lecturer.lastName}`}
        />
        <Button
          className="icon-button icon-button_small schedule-item-compact__edit"
          onClick={handleClickEdit}
        />
      </div>
      <Message
        className="schedule-item-compact__message"
        value={disciplines.find(item => item.id === scheduleItem.disciplineId).name}
      />
      <Message
        className="schedule-item-compact__message"
        value={I18n.t(`components.activities.${scheduleItem.activityType.toLowerCase()}`)}
      />
      <ul className="schedule-item-compact__periods-list">{renderPeriods()}</ul>
    </div>
  );
}

ScheduleItemCompact.propTypes = {
  scheduleItem: PropTypes.shape({
    event: PropTypes.shape({
      lecturerId: PropTypes.number,
      periods: PropTypes.arrayOf(
        PropTypes.shape({
          classroomId: PropTypes.number,
          timeBlockId: PropTypes.number,
          dateFrom: PropTypes.string,
          dateTo: PropTypes.string,
          interval: PropTypes.string,
        })
      ),
    }),
    disciplineId: PropTypes.number,
    activityType: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lecturers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  disciplines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteScheduleItem: PropTypes.func.isRequired,
  openScheduleItemDialogWindow: PropTypes.func.isRequired,
  selectScheduleItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  lecturers: state.lecturersReducer.lecturers,
  disciplines: state.disciplinesReducer.disciplines,
});

const mapDispatchToProps = dispatch => ({
  deleteScheduleItem: bindActionCreators(deleteScheduleItemFetch, dispatch),
  openScheduleItemDialogWindow: bindActionCreators(openScheduleItemDialogWindow, dispatch),
  selectScheduleItem: bindActionCreators(selectScheduleItem, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleItemCompact);
