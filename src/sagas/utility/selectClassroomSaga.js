import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { openDialogWindow } from 'src/actions/utility/dialogWindow';
import { getClassroomFetch } from 'src/actions/classrooms/getClassroom';
import { getClassroomWithEventsFetch } from 'src/actions/classrooms/getClassroomWithEvents';
import {
  SELECT_CLASSROOM,
  OCCUPY_CLASSROOM,
  EDIT_CLASSROOM,
} from 'src/actions/utility/actionTypes';

import * as paths from 'src/constants/paths';

function* selectClassroom(payload) {
  yield put(getClassroomWithEventsFetch(payload.id, payload.date));
  yield put(openDialogWindow());
  yield put(push(`${paths.classrooms}#classroom=${payload.id}`));
}

function* occupyClassroom(payload) {
  yield put(getClassroomWithEventsFetch(payload.id, payload.date));
  yield put(push(`${paths.classroom}`));
}

function* editClassroom(payload) {
  yield put(getClassroomFetch(payload.id));
  yield put(push(`${paths.editClassroom}`));
}

export default function* watchSelectClassroom() {
  yield takeLatest(SELECT_CLASSROOM, selectClassroom);
  yield takeLatest(OCCUPY_CLASSROOM, occupyClassroom);
  yield takeLatest(EDIT_CLASSROOM, editClassroom);
}
