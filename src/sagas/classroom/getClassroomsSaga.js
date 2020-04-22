import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getClassroomsRequest,
  getClassroomsSuccess,
  getClassroomsFail,
} from 'src/actions/classrooms/getClassrooms';
import { GET_CLASSROOMS_FETCH } from 'src/actions/classrooms/actionTypes';

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

export default function* watchFetchGetClassrooms() {
  yield takeLatest(GET_CLASSROOMS_FETCH, getClassrooms);
}
