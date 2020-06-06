import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Button from 'src/components/atoms/button/Button';

import { selectClassroom } from 'src/actions/classrooms/utility';
import { getClassroomForClassroomsFetch } from 'src/actions/classrooms/getClassroomWithEvents';

import * as paths from 'src/constants/paths';

import TimeOccupationList from '../timeOccupationList/TimeOccupationList';

import './style.scss';

function ClassroomCompact(props) {
  const {
    classroom,
    date,
    historyPush,
    selectClassroom: selectClassroomAction,
    getClassroomForClassrooms,
  } = props;

  useEffect(() => {
    if (classroom && classroom.id && date) {
      getClassroomForClassrooms(classroom.id, date);
    }
  }, [classroom, date, getClassroomForClassrooms]);

  const clickAuditory = () => {
    selectClassroomAction(classroom.id);
    historyPush(`${paths.classroom}`);
  };

  return (
    <div className="classroom-compact">
      <Button
        className="classroom-compact__button"
        value={classroom.number}
        onClick={clickAuditory}
      />
      <div className="classroom-compact__times">
        <TimeOccupationList id={classroom.id} />
      </div>
    </div>
  );
}

ClassroomCompact.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.any,
    number: PropTypes.string,
  }).isRequired,
  date: PropTypes.string.isRequired,
  historyPush: PropTypes.func,
  selectClassroom: PropTypes.func,
  getClassroomForClassrooms: PropTypes.func,
};

ClassroomCompact.defaultProps = {
  historyPush: () => {},
  selectClassroom: () => {},
  getClassroomForClassrooms: () => {},
};

const mapStateToProps = state => ({
  date: state.utilityReducer.date,
});

const mapDispatchToProps = dispatch => ({
  historyPush: bindActionCreators(push, dispatch),
  selectClassroom: bindActionCreators(selectClassroom, dispatch),
  getClassroomForClassrooms: bindActionCreators(getClassroomForClassroomsFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomCompact);
