import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import Field from 'src/components/atoms/field/Field';
import ClassroomHeader from 'src/components/atoms/classroomHeader/ClassroomHeader';
import ClassroomsFooter from 'src/components/molecules/classroomsFooter/ClassroomsFooter';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import DialogWindow from 'src/components/molecules/dialogWindow/DialogWindow';

import { occupyClassroom, editClassroom } from 'src/actions/utility/selectClassroom';

import TimeOccupationList from '../timeOccupationList/TimeOccupationList';

import './style.scss';

function ClassroomDialog(props) {
  const {
    classroom,
    occupyClassroom: occupyClassroomAction,
    editClassroom: editClassroomAction,
    date: propDate,
  } = props;

  const [date, setDate] = useState(propDate);

  useEffect(() => {
    setDate(propDate);
  }, [propDate]);

  const occupyClassroomFunction = () => occupyClassroomAction(classroom.id, date);

  const editClassroomFunction = () => editClassroomAction(classroom.id);

  const handleChangeInDate = event => setDate(event.target.value);

  return (
    <DialogWindow className="classroom-dialog__classroom">
      <ClassroomHeader
        number={classroom.number ? classroom.number : ''}
        className="classroom-dialog__header"
      />
      <Field
        className="classroom-dialog__date-picker base-field"
        type="date"
        value={date}
        onChange={handleChangeInDate}
      />
      <div className="classroom-dialog__info-sections">
        <ClassroomTags tags={classroom.tags} />
        <TimeOccupationList />
      </div>
      <ClassroomsFooter
        footerClassName="classroom-dialog__buttons-footer"
        firstButtonValue={I18n.t('pages.classrooms.buttons.occupy')}
        firstButtonFunc={occupyClassroomFunction}
        secondButtonValue={I18n.t('pages.classrooms.buttons.edit')}
        secondButtonFunc={editClassroomFunction}
      />
    </DialogWindow>
  );
}

ClassroomDialog.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.any,
    number: PropTypes.string,
    occupationInfo: PropTypes.arrayOf(PropTypes.shape({})),
    tags: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  date: PropTypes.string,
  occupyClassroom: PropTypes.func,
  editClassroom: PropTypes.func,
};

ClassroomDialog.defaultProps = {
  date: '',
  occupyClassroom: () => {},
  editClassroom: () => {},
};

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  date: state.utilityReducer.date,
});

const mapDispatchToProps = dispatch => ({
  occupyClassroom: bindActionCreators(occupyClassroom, dispatch),
  editClassroom: bindActionCreators(editClassroom, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomDialog);
