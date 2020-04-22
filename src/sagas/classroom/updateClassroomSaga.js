import { takeLatest, put, call } from 'redux-saga/effects';

import { update } from 'src/fetcher/fetcher';
import {
  updateClassroomRequest,
  updateClassroomSuccess,
  updateClassroomFail,
} from 'src/actions/classrooms/updateClassroom';
import { UPDATE_CLASSROOM_FETCH } from 'src/actions/classrooms/actionTypes';

function* updateClassroom(payload) {
  try {
    yield put(updateClassroomRequest());
    yield call(update, payload.url, payload.classroom);
    yield put(updateClassroomSuccess({ classroom: payload.classroom }));
  } catch (error) {
    yield put(updateClassroomFail(error));
  }
}

export default function* watchFetchUpdateClassroom() {
  yield takeLatest(UPDATE_CLASSROOM_FETCH, updateClassroom);
}
