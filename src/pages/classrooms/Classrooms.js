import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ClassroomsFooter from 'src/components/molecules/classroomsFooter/ClassroomsFooter';
import Message from 'src/components/atoms/message/Message';

import { getClassroomsFetch } from 'src/actions/classrooms/getClassrooms';
import { checkUserFetch } from 'src/actions/user/whoAmI';
import { getTimeBlocksFetch } from 'src/actions/timeBlocks/getTimeBlocks';
import { clearClassrooms } from 'src/actions/classrooms/utility';

import ClassroomDialog from './components/classroomDialog/ClassroomDialog';
import ClassroomCompact from './components/classroomCompact/ClassroomCompact';
import ClassroomsFilter from './components/classroomsFilter/ClassroomsFilter';

import './style.scss';

function Classrooms(props) {
  const [page, setPage] = useState(1);

  const {
    hasPrev,
    hasNext,
    wasGetRequest,
    buildingId,
    getClassrooms,
    getTimeBlocks,
    checkUser,
    clearClassrooms: clearClassroomsAction,
    classrooms,
  } = props;

  useEffect(() => {
    getTimeBlocks();
    checkUser();
    return () => {
      clearClassroomsAction();
    };
  }, [getTimeBlocks, checkUser, clearClassroomsAction]);

  const renderList = () => {
    const classroomsCompacts = classrooms.map(item => (
      <ClassroomCompact key={item.id} classroom={item} />
    ));
    return <div className="classrooms">{classroomsCompacts}</div>;
  };

  const next = () => {
    getClassrooms(buildingId, page + 1);
    setPage(page + 1);
  };

  const prev = () => {
    getClassrooms(buildingId, page - 1);
    setPage(page - 1);
  };

  return (
    <React.Fragment>
      <div className="classrooms-page">
        <ClassroomsFilter />
        <div className="classrooms-page__content">
          {classrooms && classrooms.length > 0 ? (
            renderList()
          ) : (
            <Message
              className="classrooms-page__message"
              value={
                !wasGetRequest
                  ? I18n.t('pages.classrooms.messages.no-filter')
                  : I18n.t('pages.classrooms.messages.no-classrooms')
              }
            />
          )}
          {classrooms && classrooms.length > 0 ? (
            <ClassroomsFooter
              firstButtonValue={I18n.t('pages.classrooms.buttons.prev-page')}
              firstButtonEnable={hasPrev}
              firstButtonFunc={prev}
              secondButtonValue={I18n.t('pages.classrooms.buttons.next-page')}
              secondButtonEnable={hasNext}
              secondButtonFunc={next}
            />
          ) : null}
        </div>
      </div>
      <ClassroomDialog />
    </React.Fragment>
  );
}

Classrooms.propTypes = {
  getClassrooms: PropTypes.func,
  getTimeBlocks: PropTypes.func,
  clearClassrooms: PropTypes.func,
  checkUser: PropTypes.func,
  classrooms: PropTypes.arrayOf(PropTypes.shape).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  wasGetRequest: PropTypes.bool.isRequired,
  buildingId: PropTypes.number.isRequired,
};

Classrooms.defaultProps = {
  getClassrooms: () => {},
  checkUser: () => {},
  getTimeBlocks: () => {},
  clearClassrooms: () => {},
};

const mapStateToProps = state => ({
  classrooms: state.classroomsReducer.classrooms,
  wasGetRequest: state.classroomsReducer.wasGetRequest,
  hasNext: state.classroomsReducer.hasNext,
  hasPrev: state.classroomsReducer.hasPrev,
  buildingId: state.buildingReducer.selectedId,
});

const mapDispatchToProps = dispatch => ({
  getClassrooms: bindActionCreators(getClassroomsFetch, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  getTimeBlocks: bindActionCreators(getTimeBlocksFetch, dispatch),
  clearClassrooms: bindActionCreators(clearClassrooms, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classrooms);
