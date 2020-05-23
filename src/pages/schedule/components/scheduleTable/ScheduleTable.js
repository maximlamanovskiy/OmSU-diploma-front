import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';

import Message from 'src/components/atoms/message/Message';

import { getTimeBlocksFetch } from 'src/actions/timeBlocks/getTimeBlocks';
import { clearSchedule } from 'src/actions/schedule/clearSchedule';

import { days } from 'src/utils/date';

import ScheduleHeader from '../scheduleHeader/ScheduleHeader';
import ScheduleColumn from '../scheduleColumn/ScheduleColumn';

import './style.scss';

const dayOfWeeks = days.slice(1).map(day => day.toLowerCase());

function ScheduleTable(props) {
  const {
    className,
    type,
    schedule,
    timeBlocks,
    getTimeBlocks,
    clearSchedule: clearScheduleAction,
    wasGetRequest,
  } = props;

  useEffect(() => {
    getTimeBlocks();
    return () => {
      clearScheduleAction();
    };
  }, [getTimeBlocks, clearScheduleAction]);

  const headers = schedule && type !== 'group' ? Object.keys(schedule) : dayOfWeeks;

  const scheduleStyles = {
    gridTemplateColumns: `1fr repeat(${headers.length}, 2fr)`,
    gridTemplateRows: 'auto',
  };

  const renderSchedule = () =>
    headers &&
    headers.map((item, index) => (
      <ScheduleColumn
        key={item}
        day={item}
        schedule={schedule[item] ? schedule[item] : {}}
        timeBlocks={timeBlocks}
        number={index + 2}
      />
    ));

  return (
    <aside className={`schedule-table ${className}`}>
      {!schedule ? (
        <Message
          className="schedule-table__message"
          value={
            wasGetRequest
              ? I18n.t('components.schedule.no-schedule-message')
              : I18n.t('components.schedule.no-filter-message')
          }
        />
      ) : (
        <div className="schedule-table__schedule" style={scheduleStyles}>
          <ScheduleHeader headers={dayOfWeeks} style={scheduleStyles} />
          <ScheduleColumn timeBlocks={timeBlocks} />
          {renderSchedule()}
        </div>
      )}
    </aside>
  );
}

ScheduleTable.propTypes = {
  schedule: PropTypes.shape({}),
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  wasGetRequest: PropTypes.bool,
  getTimeBlocks: PropTypes.func,
  clearSchedule: PropTypes.func,
};

ScheduleTable.defaultProps = {
  schedule: null,
  className: '',
  type: 'group',
  wasGetRequest: false,
  getTimeBlocks: () => {},
  clearSchedule: () => {},
};

const mapStateToProps = state => ({
  schedule: state.scheduleReducer.schedule,
  wasGetRequest: state.scheduleReducer.wasGetRequest,
  timeBlocks: state.timeblocksReducer.timeBlocks,
});

const mapDispatchToProps = dispatch => ({
  getTimeBlocks: bindActionCreators(getTimeBlocksFetch, dispatch),
  clearSchedule: bindActionCreators(clearSchedule, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTable);
