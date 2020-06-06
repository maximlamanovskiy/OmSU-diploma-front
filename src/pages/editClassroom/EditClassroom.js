import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace, goBack } from 'react-router-redux';

import Header from 'src/components/atoms/header/Header';
import ClassroomTags from 'src/components/molecules/classroomTags/ClassroomTags';
import FieldWithLabel from 'src/components/atoms/fieldWithLabel/FieldWithLabel';
import Footer from 'src/components/molecules/footer/Footer';

import { deleteClassroomFetch } from 'src/actions/classrooms/deleteClassroom';
import { updateClassroomFetch } from 'src/actions/classrooms/updateClassroom';
import { checkUserFetch } from 'src/actions/user/whoAmI';

import * as paths from 'src/constants/paths';

import './style.scss';

function EditClassroom(props) {
  const {
    classroom,
    selectedClassroomId,
    historyReplace,
    updateClassroom,
    deleteClassroom,
    historyGoBack,
    checkUser,
  } = props;

  const [number, setNumber] = useState('');

  useEffect(() => {
    if (!selectedClassroomId || selectedClassroomId === -1) {
      historyReplace(paths.classrooms);
    }
    checkUser();
  }, [selectedClassroomId, historyReplace, checkUser]);

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
        <Header
          value={I18n.t('pages.classroom.header.number', { number })}
          className="edit-header"
        />
      </header>
      <article className="edit-classroom__classroom-editor">
        <ClassroomTags tags={classroom.tags} />
        <FieldWithLabel
          labelValue={I18n.t('components.labels.classroom-number')}
          name="number"
          value={number}
          onChange={handleChangeInNumber}
        />
      </article>
      <Footer
        values={[
          I18n.t('components.buttons.back'),
          I18n.t('components.buttons.save'),
          I18n.t(`components.buttons.delete`),
        ]}
        functions={[historyGoBack, saveClassroomFunction, deleteClassroomFunction]}
        keys={[1, 2, 3]}
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
  historyReplace: PropTypes.func,
  updateClassroom: PropTypes.func,
  deleteClassroom: PropTypes.func,
  historyGoBack: PropTypes.func,
  checkUser: PropTypes.func,
};

EditClassroom.defaultProps = {
  historyReplace: () => {},
  updateClassroom: () => {},
  deleteClassroom: () => {},
  historyGoBack: () => {},
  checkUser: () => {},
};

const mapStateToProps = state => ({
  classroom: state.classroomsReducer.classroom,
  selectedClassroomId: state.classroomsReducer.selectedClassroomId,
  date: state.utilityReducer.date,
});

const mapDispatchToProps = dispatch => ({
  deleteClassroom: bindActionCreators(deleteClassroomFetch, dispatch),
  updateClassroom: bindActionCreators(updateClassroomFetch, dispatch),
  historyReplace: bindActionCreators(replace, dispatch),
  historyGoBack: bindActionCreators(goBack, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClassroom);
