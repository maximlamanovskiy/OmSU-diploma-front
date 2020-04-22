import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';

import './style.scss';

export default function ClassroomHeader(props) {
  const { className, number } = props;

  return (
    <h1 className={`classroom-header__header ${className}`}>
      {I18n.t('pages.classroom.header.number', { number })}
    </h1>
  );
}

ClassroomHeader.defaultProps = {
  className: '',
};

ClassroomHeader.propTypes = {
  number: PropTypes.string.isRequired,
  className: PropTypes.string,
};
