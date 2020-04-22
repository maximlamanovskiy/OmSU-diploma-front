import React from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Message from 'src/components/atoms/message/Message';
import Button from 'src/components/atoms/button/Button';

import { selectLesson } from 'src/actions/utility/selectLesson';

import './style.scss';

function LessonCompact(props) {
  const { className, lesson, selectLesson: selectLessonAction, type } = props;

  const onClick = () => selectLessonAction(lesson.id);

  const renderGroups = () => {
    let groups = '';
    lesson.groups.forEach((group, index) => {
      groups += group;
      if (index + 1 < lesson.groups.length) groups += ', ';
    });
    return <Message className="lesson-compact__message lesson-compact__groups" value={groups} />;
  };

  return (
    <Button className={`lesson-compact ${className}`} onClick={onClick}>
      <Message
        className="lesson-compact__message lesson-compact__type"
        value={`${lesson.activity}${I18n.t(`components.schedule.lessons.${lesson.interval}`)}`}
      />
      {!lesson.require && (
        <Message
          className="lesson-compact__message lesson-compact__type"
          value={I18n.t('components.schedule.lessons.optional')}
        />
      )}
      <Message
        className="lesson-compact__message lesson-compact__name"
        value={`${lesson.discipline}, ${lesson.buildingNumber}-${lesson.classroom}`}
      />
      {type === 'lecturers' ? (
        renderGroups()
      ) : (
        <Message
          className="lesson-compact__message lesson-compact__lecturer"
          value={lesson.lecturer}
        />
      )}
    </Button>
  );
}

LessonCompact.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.any,
    interval: PropTypes.string,
    buildingNumber: PropTypes.number,
    classroom: PropTypes.string,
    lecturer: PropTypes.string,
    discipline: PropTypes.string,
    activity: PropTypes.string,
    require: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  selectLesson: PropTypes.func,
};

LessonCompact.defaultProps = {
  className: '',
  type: '',
  selectLesson: () => {},
};

const mapStateToProps = state => ({
  type: state.scheduleReducer.type,
});

const mapDispatchToProps = dispatch => ({
  selectLesson: bindActionCreators(selectLesson, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonCompact);
