import { takeLatest, put } from 'redux-saga/effects';

import { GET_LECTURER_OPTIONS } from 'src/actions/filter/actionTypes';
import { getLecturersFetch } from 'src/actions/lecturers/getLecturers';
import { getDepartmentsFetch } from 'src/actions/departments/getDepartments';

function* getLecturerOptions() {
  yield put(getLecturersFetch());
  yield put(getDepartmentsFetch());
}

export default function* watchGetLecturerOptions() {
  yield takeLatest(GET_LECTURER_OPTIONS, getLecturerOptions);
}
