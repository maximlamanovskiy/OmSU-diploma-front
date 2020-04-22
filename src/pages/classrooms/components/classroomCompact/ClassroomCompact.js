import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { selectClassroom } from 'src/actions/utility/selectClassroom';

import './style.scss';

function ClassroomCompact(props) {
  const { classroom, date } = props;

  const clickAuditory = () => props.selectClassroom(classroom.id, date);

  return (
    <Button className="classroom-compact" onClick={clickAuditory}>
      {classroom.number}
    </Button>
  );
}

ClassroomCompact.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.any,
    number: PropTypes.string,
  }).isRequired,
  date: PropTypes.string.isRequired,
  selectClassroom: PropTypes.func,
};

ClassroomCompact.defaultProps = {
  selectClassroom: () => {},
};

const mapDispatchToProps = dispatch => ({
  selectClassroom: bindActionCreators(selectClassroom, dispatch),
});

const mapStateToProps = state => ({
  date: state.utilityReducer.date,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomCompact);
