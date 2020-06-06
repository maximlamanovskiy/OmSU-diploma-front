import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'src/components/atoms/button/Button';

import { clearClassrooms } from 'src/actions/classrooms/utility';
import { selectBuilding } from 'src/actions/buildings/selectBuilding';
import { checkUserFetch } from 'src/actions/user/whoAmI';

import ScheduleFilter from './components/scheduleFilter/ScheduleFilter';
import ScheduleTable from './components/scheduleTable/ScheduleTable';
import LessonDialog from './components/lessonDialog/LessonDialog';

import './style.scss';

function Schedule(props) {
  const [isOpen, setIsOpen] = useState(true);

  const {
    clearClassrooms: clearClassroomsAction,
    selectBuilding: selectBuildingAction,
    checkUser,
  } = props;

  useEffect(() => {
    clearClassroomsAction();
    selectBuildingAction(null);
    checkUser();
  }, [clearClassroomsAction, selectBuildingAction, checkUser]);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div className="schedule">
        <Button
          className={classNames('schedule__hide-filter', {
            'schedule__hide-filter_close': !isOpen,
          })}
          onClick={onClick}
          value={isOpen ? '-' : '+'}
        />
        <ScheduleFilter isClose={!isOpen} />
        <ScheduleTable className={!isOpen ? 'schedule-table_full' : ''} type="group" />
      </div>
      <LessonDialog />
    </React.Fragment>
  );
}

Schedule.propTypes = {
  clearClassrooms: PropTypes.func,
  selectBuilding: PropTypes.func,
  checkUser: PropTypes.func,
};

Schedule.defaultProps = {
  clearClassrooms: () => {},
  selectBuilding: () => {},
  checkUser: () => {},
};

const mapDispatchToProps = dispatch => ({
  clearClassrooms: bindActionCreators(clearClassrooms, dispatch),
  selectBuilding: bindActionCreators(selectBuilding, dispatch),
  checkUser: bindActionCreators(checkUserFetch, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(Schedule);
