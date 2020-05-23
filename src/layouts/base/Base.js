import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'src/components/atoms/spinner/Spinner';

import { checkUserFetch } from 'src/actions/user/whoAmI';

import NavigationOptions from './components/navigationOptions/NavigationOptions';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SideMenu from './components/sideMenu/SideMenu';

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
    checkUser,
  } = props;

  useEffect(() => {
    checkUser();
  }, [checkUser]);

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
      <Spinner
        disable={
          !isUserLoading &&
          !isClassroomLoading &&
          !isDepartmentsLoading &&
          !isFacultiesLoading &&
          !isLecturersLoading &&
          !isGroupsLoading &&
          !isScheduleLoading &&
          !isBuildingsLoading
        }
      />
    </React.Fragment>
  );
}

Base.propTypes = {
  children: PropTypes.node.isRequired,
  isUserLoading: PropTypes.bool,
  isClassroomLoading: PropTypes.bool,
  isDepartmentsLoading: PropTypes.bool,
  isFacultiesLoading: PropTypes.bool,
  isLecturersLoading: PropTypes.bool,
  isGroupsLoading: PropTypes.bool,
  isScheduleLoading: PropTypes.bool,
  isBuildingsLoading: PropTypes.bool,
  checkUser: PropTypes.func,
};

Base.defaultProps = {
  isUserLoading: false,
  isClassroomLoading: false,
  isLecturersLoading: false,
  isDepartmentsLoading: false,
  isFacultiesLoading: false,
  isGroupsLoading: false,
  isScheduleLoading: false,
  isBuildingsLoading: false,
  checkUser: () => {},
};

const mapStateToProps = state => ({
  isUserLoading: state.userReducer.isLoading,
  isClassroomLoading: state.classroomsReducer.isLoading,
  isLecturersLoading: state.lecturersReducer.isLoading,
  isDepartmentsLoading: state.departmentsReducer.isLoading,
  isFacultiesLoading: state.facultiesReducer.isLoading,
  isGroupsLoading: state.groupsReducer.isLoading,
  isScheduleLoading: state.scheduleReducer.isLoading,
  isBuildingsLoading: state.buildingReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  checkUser: bindActionCreators(checkUserFetch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Base);
