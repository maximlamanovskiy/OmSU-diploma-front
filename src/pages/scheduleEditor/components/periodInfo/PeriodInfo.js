import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import Message from 'src/components/atoms/message/Message';

import './style.scss';

export default function PeriodInfo(props) {
  const { period, timeBlock } = props;

  return (
    <div className="period-info">
      <Message className="period-info__message" value={`${period.dateFrom}/${period.dateTo}`} />
      <Message
        className="period-info__message"
        value={I18n.t(`components.intervals.${period.interval.toLowerCase()}`)}
      />
      <Message
        className="period-info__message"
        value={`${timeBlock.timeFrom}/${timeBlock.timeTo}`}
      />
      <Message className="period-info__message" value={period.classroom.number} />
    </div>
  );
}

PeriodInfo.propTypes = {
  period: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    interval: PropTypes.string,
    classroom: PropTypes.shape({
      number: PropTypes.string,
    }),
  }).isRequired,
  timeBlock: PropTypes.shape({
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
  }).isRequired,
};
