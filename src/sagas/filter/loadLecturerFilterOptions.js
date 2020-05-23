import { takeLatest, put } from 'redux-saga/effects';

import { GET_LECTURER_OPTIONS } from 'src/actions/filter/actionTypes';
import { getLecturersFetch } from 'src/actions/lecturers/getLecturers';

function* getLecturerOptions() {
  yield put(getLecturersFetch());
}

export default function* watchGetLecturerOptions() {
  yield takeLatest(GET_LECTURER_OPTIONS, getLecturerOptions);
}
