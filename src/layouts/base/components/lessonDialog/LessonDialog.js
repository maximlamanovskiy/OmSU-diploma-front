import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';

import DialogWindow from 'src/components/molecules/dialogWindow/DialogWindow';
import Header from 'src/components/atoms/header/Header';
import Message from 'src/components/atoms/message/Message';

import './style.scss';

function LessonDialog(props) {
  const { lesson } = props;

  const getRequired = require =>
    require ? '' : `${I18n.t('components.schedule.lessons.optional')}, `;

  const getGroups = groups => {
    let message = '';
    groups.forEach((group, index) => {
      message += group.name;
      if (index + 1 < groups.length) {
        message += ', ';
      }
    });
    return message;
  };

  const activity = lesson.activity
    ? I18n.t(`components.activities.${lesson.activity.toLowerCase()}`).toLowerCase()
    : '';
  const interval = lesson.interval
    ? I18n.t(`components.schedule.lessons.${lesson.interval.toLowerCase()}-full`).toLowerCase()
    : '';

  return (
    <DialogWindow className="lesson-dialog" isOpen={props.isOpen}>
      <Header className="lesson-dialog__header-name" value={lesson.discipline} />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${getRequired(lesson.require)}${activity}${interval}`}
      />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${lesson.lecturer.firstName} ${lesson.lecturer.patronymic} ${lesson.lecturer.lastName}`}
      />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${I18n.t('components.schedule.lessons.building')} ${
          lesson.eventPeriod.classroom.buildingNumber
        } ${I18n.t('components.schedule.lessons.classroom')} ${
          lesson.eventPeriod.classroom.classroomNumber
        }`}
      />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${I18n.t('components.schedule.lessons.from')} ${
          lesson.eventPeriod.dateFrom
        } ${I18n.t('components.schedule.lessons.to')} ${lesson.eventPeriod.dateTo}`}
      />
      <Message className="lesson-dialog__lesson-info" value={getGroups(lesson.groups)} />
    </DialogWindow>
  );
}

LessonDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  lesson: PropTypes.shape({
    interval: PropTypes.string,
    eventPeriod: PropTypes.shape({
      dateFrom: PropTypes.string,
      dateTo: PropTypes.string,
      classroom: PropTypes.shape({
        buildingNumber: PropTypes.number,
        classroomNumber: PropTypes.string,
      }),
    }),
    lecturer: PropTypes.shape({
      firstName: PropTypes.string,
      patronymic: PropTypes.string,
      lastName: PropTypes.string,
    }),
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    discipline: PropTypes.string,
    activity: PropTypes.string,
    require: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  lesson: state.scheduleReducer.lesson,
  isOpen: state.utilityReducer.isScheduleDialogOpen,
});

export default connect(
  mapStateToProps,
  null
)(LessonDialog);
