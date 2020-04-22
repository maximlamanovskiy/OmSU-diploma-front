import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getClassroomRequest,
  getClassroomSuccess,
  getClassroomFail,
} from 'src/actions/classrooms/getClassroom';
import { GET_CLASSROOM_FETCH } from 'src/actions/classrooms/actionTypes';

function* getClassroom(payload) {
  try {
    yield put(getClassroomRequest());
    const response = yield call(get, payload.url);
    yield put(
      getClassroomSuccess({
        classroom: {
          ...response,
          number: response.classroomNumber,
        },
      })
    );
  } catch (error) {
    yield put(getClassroomFail(error));
  }
}

export default function* watchFetchGetClassroom() {
  yield takeLatest(GET_CLASSROOM_FETCH, getClassroom);
}
