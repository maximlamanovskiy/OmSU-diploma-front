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
      message += group;
      if (index + 1 < groups.length) {
        message += ', ';
      }
    });
    return message;
  };

  return (
    <DialogWindow className="lesson-dialog">
      <Header className="lesson-dialog__header-name" value={lesson.discipline} />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${getRequired(lesson.require)}${lesson.activity}${I18n.t(
          `components.schedule.lessons.${lesson.interval}-full`
        )}`}
      />
      <Message className="lesson-dialog__lesson-info" value={lesson.lecturer} />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${I18n.t('components.schedule.lessons.building')} ${lesson.buildingNumber} ${I18n.t(
          'components.schedule.lessons.classroom'
        )} ${lesson.classroom}`}
      />
      <Message
        className="lesson-dialog__lesson-info"
        value={`${I18n.t('components.schedule.lessons.from')} ${lesson.dateFrom} ${I18n.t(
          'components.schedule.lessons.to'
        )} ${lesson.dateTo}`}
      />
      <Message className="lesson-dialog__lesson-info" value={getGroups(lesson.groups)} />
    </DialogWindow>
  );
}

LessonDialog.propTypes = {
  lesson: PropTypes.shape({
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    interval: PropTypes.string,
    buildingNumber: PropTypes.number,
    classroom: PropTypes.string,
    lecturer: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.string),
    discipline: PropTypes.string,
    activity: PropTypes.string,
    require: PropTypes.bool,
  }),
};

LessonDialog.defaultProps = {
  lesson: {
    discipline: '',
    groups: [],
  },
};

const mapStateToProps = state => ({
  lesson: state.scheduleReducer.lesson,
});

export default connect(
  mapStateToProps,
  null
)(LessonDialog);
