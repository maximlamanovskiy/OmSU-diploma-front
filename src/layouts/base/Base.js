import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Spinner from 'src/components/atoms/spinner/Spinner';

import NavigationOptions from './components/navigationOptions/NavigationOptions';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SideMenu from './components/sideMenu/SideMenu';
import LessonDialog from './components/lessonDialog/LessonDialog';
import EditEventDialog from './components/editEventDialog/editEventDialog/EditEventDialog';
import RescheduleEventDialog from './components/rescheduleEventDialog/RescheduleEventDialog';
import ScheduleItemDialog from './components/scheduleItemDialog/scheduleItemDialog/ScheduleItemDialog';

import './style.scss';

function Base(props) {
  const [isMenuOpen, changeIsMenuOpen] = useState(false);

  const openMenu = () => changeIsMenuOpen(!isMenuOpen);

  const {
    children,
    isUserLoading,
    isClassroomLoading,
    isLecturersLoading,
    isDepartmentsLoading,
    isFacultiesLoading,
    isGroupsLoading,
    isScheduleLoading,
    isBuildingsLoading,
    isDisciplineLoading,
    isEventLoading,
    isRescheduleLoading,
    isTimeBlocksLoading,
  } = props;

  return (
    <React.Fragment>
      <SideMenu outsideAreaEvent={openMenu} isOpen={isMenuOpen}>
        <NavigationOptions onClick={openMenu} />
      </SideMenu>
      <Header toggleMenuEvent={openMenu} />
      <main className="base-main">
        <section className="base-main__content">{children}</section>
      </main>
      <Footer />
      <EditEventDialog />
      <RescheduleEventDialog />
      <LessonDialog />
      <ScheduleItemDialog />
      <Spinner
        disable={
          !isUserLoading &&
          !isClassroomLoading &&
          !isDepartmentsLoading &&
          !isFacultiesLoading &&
          !isLecturersLoading &&
          !isGroupsLoading &&
          !isScheduleLoading &&
          !isBuildingsLoading &&
          !isDisciplineLoading &&
          !isEventLoading &&
          !isRescheduleLoading &&
          !isTimeBlocksLoading
        }
      />
    </React.Fragment>
  );
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
  isBuildingsLoading: PropTypes.bool.isRequired,
  isClassroomLoading: PropTypes.bool.isRequired,
  isDepartmentsLoading: PropTypes.bool.isRequired,
  isDisciplineLoading: PropTypes.bool.isRequired,
  isEventLoading: PropTypes.bool.isRequired,
  isFacultiesLoading: PropTypes.bool.isRequired,
  isGroupsLoading: PropTypes.bool.isRequired,
  isLecturersLoading: PropTypes.bool.isRequired,
  isRescheduleLoading: PropTypes.bool.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  isTimeBlocksLoading: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isBuildingsLoading: state.buildingReducer.isLoading,
  isClassroomLoading: state.classroomsReducer.isLoading,
  isDepartmentsLoading: state.departmentsReducer.isLoading,
  isDisciplineLoading: state.disciplinesReducer.isLoading,
  isEventLoading: state.eventReducer.isLoading,
  isFacultiesLoading: state.facultiesReducer.isLoading,
  isGroupsLoading: state.groupsReducer.isLoading,
  isLecturersLoading: state.lecturersReducer.isLoading,
  isRescheduleLoading: state.rescheduleReducer.isLoading,
  isScheduleLoading: state.scheduleReducer.isLoading,
  isTimeBlocksLoading: state.timeblocksReducer.isLoading,
  isUserLoading: state.userReducer.isLoading,
});

export default connect(
  mapStateToProps,
  null
)(Base);
