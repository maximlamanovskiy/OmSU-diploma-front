import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import Message from 'src/components/atoms/message/Message';
import Button from 'src/components/atoms/button/Button';

import { intervalsValue } from 'src/utils/date';

import './style.scss';

export default function PeriodCompact(props) {
  const { period, handleOnEditClick } = props;

  const interval = I18n.t(
    `pages.classroom.occupation.intervals.${period.interval.toLowerCase()}`
  ).toLowerCase();

  const date =
    period.interval === intervalsValue[0] ? period.dateFrom : `${period.dateFrom}/${period.dateTo}`;

  return (
    <div className="period-compact">
      <Message
        className="period-compact__message"
        value={`${date} ${interval} ${period.classroom.classroomNumber}`}
      />
      <Button
        className="icon-button icon-button_small period-compact__edit-button"
        onClick={handleOnEditClick}
      />
    </div>
  );
}

PeriodCompact.propTypes = {
  period: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    interval: PropTypes.string,
    classroom: PropTypes.shape({
      classroomNumber: PropTypes.string,
    }),
  }).isRequired,
  handleOnEditClick: PropTypes.func.isRequired,
};
