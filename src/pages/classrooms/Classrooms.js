import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Footer from 'src/components/molecules/footer/Footer';
import Message from 'src/components/atoms/message/Message';

import { getClassroomsFetch } from 'src/actions/classrooms/getClassrooms';
import { setPage, clearClassroomsEvents } from 'src/actions/classrooms/utility';
import { getTimeBlocksFetch } from 'src/actions/timeBlocks/getTimeBlocks';
import { checkUserFetch } from 'src/actions/user/whoAmI';

import ClassroomCompact from './components/classroomCompact/ClassroomCompact';
import ClassroomsFilter from './components/classroomsFilter/ClassroomsFilter';

import './style.scss';

function Classrooms(props) {
  const {
    hasPrev,
    hasNext,
    wasGetRequest,
    buildingId,
    getClassrooms,
    getTimeBlocks,
    classrooms,
    page,
    checkUser,
    setPage: setPageAction,
    clearClassroomsEvents: clearClassroomsEventsAction,
  } = props;

  useEffect(() => {
    getTimeBlocks();
    checkUser();
  }, [getTimeBlocks, checkUser]);

  const renderList = () => {
    const classroomsCompacts = classrooms.map(item => (
      <ClassroomCompact key={item.id} classroom={item} />
    ));
    return <div className="classrooms">{classroomsCompacts}</div>;
  };

  const next = () => {
    getClassrooms(buildingId, page);
    setPageAction(page + 1);
    clearClassroomsEventsAction();
  };

  const prev = () => {
    getClassrooms(buildingId, page);
    setPageAction(page - 1);
    clearClassroomsEventsAction();
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
            <Footer
              footerClassName="classrooms-footer"
              values={[
                I18n.t('pages.classrooms.buttons.prev-page'),
                I18n.t('pages.classrooms.buttons.next-page'),
              ]}
              disables={[!hasPrev, !hasNext]}
              functions={[prev, next]}
              keys={[1, 2]}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

Classrooms.propTypes = {
  buildingId: PropTypes.number,
  page: PropTypes.number,
  getClassrooms: PropTypes.func,
  getTimeBlocks: PropTypes.func,
  setPage: PropTypes.func,
  checkUser: PropTypes.func,
  clearClassroomsEvents: PropTypes.func,
  classrooms: PropTypes.arrayOf(PropTypes.shape).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  wasGetRequest: PropTypes.bool.isRequired,
};

Classrooms.defaultProps = {
  buildingId: null,
  page: 1,
  getClassrooms: () => {},
  getTimeBlocks: () => {},
  setPage: () => {},
  checkUser: () => {},
  clearClassroomsEvents: () => {},
};

const mapStateToProps = state => ({
  classrooms: state.classroomsReducer.classrooms,
  wasGetRequest: state.classroomsReducer.wasGetRequest,
  hasNext: state.classroomsReducer.hasNext,
  hasPrev: state.classroomsReducer.hasPrev,
  buildingId: state.buildingReducer.selectedId,
  page: state.classroomsReducer.page,
});

const mapDispatchToProps = dispatch => ({
  getClassrooms: bindActionCreators(getClassroomsFetch, dispatch),
  getTimeBlocks: bindActionCreators(getTimeBlocksFetch, dispatch),
  setPage: bindActionCreators(setPage, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
  clearClassroomsEvents: bindActionCreators(clearClassroomsEvents, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classrooms);
