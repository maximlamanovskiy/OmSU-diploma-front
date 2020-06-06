// import { all, fork, select, takeEvery } from 'redux-saga/effects';
import { all, fork } from 'redux-saga/effects';

import localizationSaga from './utility/localizationSaga';
import watchSelectLesson from './utility/selectLessonSaga';

import watchFetchLogin from './user/loginSaga';
import watchFetchRegistration from './user/registrationSaga';
import watchFetchWhoAmI from './user/whoAmISaga';
import watchFetchLogout from './user/logoutSaga';

import watchFetchTimeBlocks from './timeBlocks/timbBlocksSaga';

import watchFetchGetClassrooms from './classroom/getClassroomsSaga';
import watchFetchGetClassroom from './classroom/getClassroomSaga';
import watchFetchUpdateClassroom from './classroom/updateClassroomSaga';
import watchFetchDeleteClassroom from './classroom/deleteClassroomSaga';
import watchFetchGetClassroomWithEvents from './classroom/getClassroomWithEventsSaga';

import watchFetchGetDepartments from './departments/getDepartmentsSaga';

import watchFetchGetFaculties from './faculties/getFacultiesSaga';

import watchFetchGetLecturers from './lecturers/getLecturersSaga';

import watchGetLecturerOptions from './filter/loadLecturerFilterOptions';

import watchFetchGetGroups from './groups/getGroupsSaga';

import watchFetchGetSchedule from './schedule/getScheduleSaga';
import watchFetchGetLesson from './schedule/getLessonSaga';

import watchFetchCreateEvent from './events/createEventSaga';
import watchFetchDeleteEvent from './events/deleteEventSaga';
import watchFetchCancelEvent from './events/cancelEventSaga';
import watchFetchRescheduleEvent from './events/rescheduleEventSaga';
import watchFetchUpdateEvent from './events/updateEventSaga';
import watchFetchGetPeriods from './events/getPeriodsSaga';

import watchFetchGetBuildings from './buildings/getBuildingsSaga';

import watchFetchGetEvent from './events/getEventSaga';

// function* watchAndLog() {
//   yield takeEvery('*', function* logger(action) {
//     const state = yield select();
//
//     console.log('action', action);
//     console.log('state after', state);
//   });
// }

export default function* rootSaga() {
  // yield fork(watchAndLog);

  yield all([
    fork(localizationSaga),
    fork(watchSelectLesson),
    fork(watchFetchLogin),
    fork(watchFetchRegistration),
    fork(watchFetchWhoAmI),
    fork(watchFetchLogout),
    fork(watchFetchTimeBlocks),
    fork(watchFetchGetClassrooms),
    fork(watchFetchGetClassroom),
    fork(watchFetchUpdateClassroom),
    fork(watchFetchDeleteClassroom),
    fork(watchFetchGetClassroomWithEvents),
    fork(watchFetchGetDepartments),
    fork(watchFetchGetFaculties),
    fork(watchFetchGetLecturers),
    fork(watchGetLecturerOptions),
    fork(watchFetchGetGroups),
    fork(watchFetchGetSchedule),
    fork(watchFetchGetLesson),
    fork(watchFetchCreateEvent),
    fork(watchFetchGetEvent),
    fork(watchFetchDeleteEvent),
    fork(watchFetchCancelEvent),
    fork(watchFetchUpdateEvent),
    fork(watchFetchRescheduleEvent),
    fork(watchFetchGetPeriods),
    fork(watchFetchGetBuildings),
  ]);
}
