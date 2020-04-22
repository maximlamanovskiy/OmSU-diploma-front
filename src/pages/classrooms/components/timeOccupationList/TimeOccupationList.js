import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';

import Message from 'src/components/atoms/message/Message';

import './style.scss';

const hasTimeBlock = (periods, timeBlockId) =>
  periods.some(period => period.timeBlock.id === timeBlockId);

function TimeOccupationList(props) {
  const { events, timeBlocks } = props;

  const times = () => {
    const timeBlocksMessages = timeBlocks.map(item => {
      const isOccupied = events && events.some(event => hasTimeBlock(event.eventPeriods, item.id));

      const timeFrom = item.timeFrom.length === 4 ? `0${item.timeFrom}` : item.timeFrom;
      const timeTo = item.timeTo.length === 4 ? `0${item.timeTo}` : item.timeTo;

      return (
        <li key={item.id} className="list-occupations__list-item">
          <Message
            className={classNames(
              `list-occupations__occupation`,
              { 'list-occupations__occupation_free': !isOccupied },
              { 'list-occupations__occupation_occupied': isOccupied }
            )}
            value={`${timeFrom} - ${timeTo}`}
          />
        </li>
      );
    });
    return <ul className="list-occupations list">{timeBlocksMessages}</ul>;
  };

  return <section className="occupation-section">{times()}</section>;
}

TimeOccupationList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  timeBlocks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  timeBlocks: state.timeblocksReducer.timeBlocks,
  events: state.classroomsReducer.events,
});

export default connect(
  mapStateToProps,
  null
)(TimeOccupationList);
