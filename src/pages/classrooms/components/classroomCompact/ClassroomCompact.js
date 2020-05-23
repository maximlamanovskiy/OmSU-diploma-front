import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { occupyClassroom } from 'src/actions/utility/selectClassroom';

import TimeOccupationList from '../timeOccupationList/TimeOccupationList';

import './style.scss';

function ClassroomCompact(props) {
  const { classroom, date } = props;

  const clickAuditory = () => props.occupyClassroom(classroom.id, date);

  return (
    <div className="classroom-compact">
      <Button
        className="classroom-compact__button"
        value={classroom.number}
        onClick={clickAuditory}
      />
      <div className="classroom-compact__times">
        <TimeOccupationList id={classroom.id} date={date} />
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
  occupyClassroom: PropTypes.func,
};

ClassroomCompact.defaultProps = {
  occupyClassroom: () => {},
};

const mapDispatchToProps = dispatch => ({
  occupyClassroom: bindActionCreators(occupyClassroom, dispatch),
});

const mapStateToProps = state => ({
  date: state.utilityReducer.date,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomCompact);
