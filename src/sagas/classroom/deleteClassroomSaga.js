import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { remove } from 'src/fetcher/fetcher';
import {
  deleteClassroomRequest,
  deleteClassroomSuccess,
  deleteClassroomFail,
} from 'src/actions/classrooms/deleteClassroom';
import { DELETE_CLASSROOM_FETCH } from 'src/actions/classrooms/actionTypes';

import paths from 'src/constants/paths';

function* deleteClassroom(payload) {
  try {
    yield put(deleteClassroomRequest());
    yield call(remove, payload.url);
    yield put(deleteClassroomSuccess());
    yield put(push(paths.classrooms));
  } catch (error) {
    yield put(deleteClassroomFail(error));
  }
}

export default function* watchFetchDeleteClassroom() {
  yield takeLatest(DELETE_CLASSROOM_FETCH, deleteClassroom);
}
