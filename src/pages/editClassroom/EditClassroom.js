import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';

import ClassroomHeader from 'src/components/atoms/classroomHeader/ClassroomHeader';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';

import { checkUserFetch } from 'src/actions/user/whoAmI';
import { deleteClassroomFetch } from 'src/actions/classrooms/deleteClassroom';
import { updateClassroomFetch } from 'src/actions/classrooms/updateClassroom';

import * as paths from 'src/constants/paths';

import ClassroomFooter from './components/classroomFooter/ClassroomFooter';

import './style.scss';

function EditClassroom(props) {
  const {
    classroom,
    selectedClassroomId,
    checkUser,
    historyReplace,
    updateClassroom,
    deleteClassroom,
  } = props;

  const [number, setNumber] = useState('');

  useEffect(() => {
    checkUser();
    if (!selectedClassroomId || selectedClassroomId === -1) {
      historyReplace(paths.classrooms);
    }
  }, [checkUser, selectedClassroomId, historyReplace]);

  useEffect(() => {
    setNumber(classroom.number);
  }, [classroom]);

  const handleChangeInNumber = event => {
    setNumber(event.target.value);
  };

  const saveClassroomFunction = () => {
    if (number === '') {
      alert(I18n.t('pages.classroom.messages.unable-update'));
    } else {
      const req = {
        number,
      };
      updateClassroom(selectedClassroomId, req);
    }
  };

  const deleteClassroomFunction = () => {
    deleteClassroom(selectedClassroomId);
  };

  return (
    <React.Fragment>
      <header>
        <ClassroomHeader number={classroom.number ? classroom.number : ''} />
      </header>
      <article className="edit-classroom__classroom-editor">
        <ClassroomTags tags={classroom.tags} />
        <FieldWithLabel
          labelValue={I18n.t('pages.classroom.edit.classroom-number')}
          name="number"
          value={number}
          onChange={handleChangeInNumber}
        />
      </article>
      <ClassroomFooter
        middleButtonValue={I18n.t('pages.classroom.footer.buttons.save')}
        middleButtonFunction={saveClassroomFunction}
        rightButtonValue={I18n.t(`pages.classroom.footer.buttons.delete`)}
        rightButtonFunction={deleteClassroomFunction}
      />
    </React.Fragment>
  );
}

EditClassroom.propTypes = {
  classroom: PropTypes.shape({
    number: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selectedClassroomId: PropTypes.number.isRequired,
  checkUser: PropTypes.func,
  historyReplace: PropTypes.func,
  updateClassroom: PropTypes.func,
  deleteClassroom: PropTypes.func,
};

EditClassroom.defaultProps = {
  checkUser: () => {},
  historyReplace: () => {},
  updateClassroom: () => {},
  deleteClassroom: () => {},
};

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  date: state.utilityReducer.date,
});

const mapDispatchToProps = dispatch => ({
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  deleteClassroom: bindActionCreators(deleteClassroomFetch, dispatch),
  updateClassroom: bindActionCreators(updateClassroomFetch, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClassroom);
