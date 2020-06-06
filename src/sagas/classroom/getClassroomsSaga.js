import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getClassroomsRequest,
  getClassroomsSuccess,
  getClassroomsFail,
  getClassroomsForRescheduleRequest,
  getClassroomsForRescheduleSuccess,
  getClassroomsForRescheduleFail,
} from 'src/actions/classrooms/getClassrooms';
import {
  GET_CLASSROOMS_FETCH,
  GET_CLASSROOMS_FOR_RESCHEDULE_FETCH,
} from 'src/actions/classrooms/actionTypes';

function* getClassrooms(payload) {
  try {
    yield put(getClassroomsRequest());
    const response = yield call(get, payload.url);
    yield put(
      getClassroomsSuccess({
        classrooms: response.classrooms.map(classroom => ({
          ...classroom,
          number: classroom.classroomNumber,
        })),
        meta: response.metaInfo,
      })
    );
  } catch (error) {
    yield put(getClassroomsFail(error));
  }
}

function* getClassroomsForReschedule(payload) {
  try {
    yield put(getClassroomsForRescheduleRequest());
    const response = yield call(get, payload.url);
    yield put(
      getClassroomsForRescheduleSuccess({
        classrooms: response.classrooms.map(classroom => ({
          ...classroom,
          number: classroom.classroomNumber,
          value: classroom.id,
          label: classroom.classroomNumber,
        })),
      })
    );
  } catch (error) {
    yield put(getClassroomsForRescheduleFail(error));
  }
}

export default function* watchFetchGetClassrooms() {
  yield takeLatest(GET_CLASSROOMS_FETCH, getClassrooms);
  yield takeLatest(GET_CLASSROOMS_FOR_RESCHEDULE_FETCH, getClassroomsForReschedule);
}
