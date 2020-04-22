import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import { routerReducer } from 'react-router-redux';

import classroomsReducer from './classroomsReducer';
import userReducer from './userReducer';
import utilityReducer from './utilityReducer';
import timeblocksReducer from './timeblocksReducer';
import eventReducer from './eventReducer';
import departmentsReducer from './departmentsReducer';
import facultiesReducer from './facultiesReducer';
import lecturersReducer from './lecturersReducer';
import groupsReducer from './groupsReducer';
import filterReducer from './filterReducer';
import scheduleReducer from './scheduleReducer';
import buildingReducer from './buildingReducer';

export default (state = {}, action) =>
  combineReducers({
    classroomsReducer,
    userReducer,
    utilityReducer,
    timeblocksReducer,
    eventReducer,
    departmentsReducer,
    facultiesReducer,
    lecturersReducer,
    groupsReducer,
    filterReducer,
    scheduleReducer,
    buildingReducer,
    i18n: i18nReducer,
    routing: routerReducer,
  })(state, action);
