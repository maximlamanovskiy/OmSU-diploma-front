import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import Header from 'src/components/atoms/header/Header';

import './style.scss';

export default function ScheduleHeader(props) {
  const { headers, style } = props;

  const headerElements = headers.map(header => (
    <div key={header} className="schedule-header__element">
      <Header
        className="schedule-header__header-text"
        value={I18n.t(`components.schedule.week.${header}`)}
      />
    </div>
  ));

  return (
    <div className="schedule-header" style={style}>
      <div className="schedule-header__element" />
      {headerElements}
    </div>
  );
}

ScheduleHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.shape({}),
};

ScheduleHeader.defaultProps = {
  headers: [],
  style: {},
};
