import React from 'react';

import { I18n } from 'react-redux-i18n';

import Message from 'src/components/atoms/message/Message';

import './style.scss';

export default function ColorInfo() {
  return (
    <ul className="color-info list">
      <li className="color-info__color">
        <div className="color__color-block free-color" />
        <Message
          className="color__text-color"
          value={I18n.t('pages.classroom.header.statuses.free')}
        />
      </li>
      <li className="color-info__color">
        <div className="color__color-block selected-color" />
        <Message
          className="color__text-color"
          value={I18n.t('pages.classroom.header.statuses.selected')}
        />
      </li>
      <li className="color-info__color">
        <div className="color__color-block occupied-color" />
        <Message
          className="color__text-color"
          value={I18n.t('pages.classroom.header.statuses.occupied')}
        />
      </li>
    </ul>
  );
}
