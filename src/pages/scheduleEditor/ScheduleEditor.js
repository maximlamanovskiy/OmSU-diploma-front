import React from 'react';

import { I18n } from 'react-redux-i18n';

import Button from 'src/components/atoms/button/Button';
import ScheduleEditorOptions from './components/scheduleEditorOptions/ScheduleEditorOptions';

import './style.scss';

export default function ScheduleEditor() {
  const editSchedule = () => {};

  return (
    <div className="schedule-editor">
      <ScheduleEditorOptions />
      <Button
        className="action-button schedule-editor__button"
        onClick={editSchedule}
        value={I18n.t('page.schedule-editor.buttons.edit')}
      />
    </div>
  );
}
