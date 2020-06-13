import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { I18n } from 'react-redux-i18n';

export default function DayInfo(props) {
  const { day, start, end } = props;

  const style = {
    gridRow: `${start}/${end}`,
  };

  return (
    <div className="day-info" style={style}>
      <span className="day-info__text">
        {I18n.t(`components.schedule.week.${day.toLowerCase()}`)}
      </span>
    </div>
  );
}

DayInfo.propTypes = {
  day: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};
