import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import Header from 'src/components/atoms/header/Header';

import './style.scss';

export default function ScheduleHeader(props) {
  const { headers, style, isCourses } = props;

  const headerElements = () =>
    headers.map(header => (
      <div key={header} className="schedule-header__element">
        <Header
          className="schedule-header__header-text"
          value={isCourses ? header : I18n.t(`components.schedule.week.${header.toLowerCase()}`)}
        />
      </div>
    ));

  return (
    <div className="schedule-header" style={style}>
      <div className="schedule-header__element" />
      {isCourses ? <div className="schedule-header__element" /> : null}
      {headerElements()}
    </div>
  );
}

ScheduleHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.shape({}),
  isCourses: PropTypes.bool,
};

ScheduleHeader.defaultProps = {
  headers: [],
  style: {},
  isCourses: false,
};
