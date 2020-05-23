import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getClassroomFetch } from 'src/actions/classrooms/getClassroom';
import { getClassroomWithEventsFetch } from 'src/actions/classrooms/getClassroomWithEvents';
import { selectTime } from 'src/actions/event/eventUtility';
import {
  OCCUPY_CLASSROOM,
  EDIT_CLASSROOM,
  OCCUPY_CLASSROOM_WITH_TIME,
} from 'src/actions/utility/actionTypes';

import * as paths from 'src/constants/paths';

function* occupyClassroom(payload) {
  yield put(getClassroomWithEventsFetch(payload.id, payload.date));
  yield put(push(`${paths.classroom}`));
}

function* occupyClassroomWithTime(payload) {
  yield put(getClassroomWithEventsFetch(payload.id, payload.date));
  yield put(selectTime(payload.timeIndex));
  yield put(push(`${paths.classroom}`));
}

function* editClassroom(payload) {
  yield put(getClassroomFetch(payload.id));
  yield put(push(`${paths.editClassroom}`));
}

export default function* watchSelectClassroom() {
  yield takeLatest(OCCUPY_CLASSROOM, occupyClassroom);
  yield takeLatest(OCCUPY_CLASSROOM_WITH_TIME, occupyClassroomWithTime);
  yield takeLatest(EDIT_CLASSROOM, editClassroom);
}
