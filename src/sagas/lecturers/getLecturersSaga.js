import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getLecturersRequest,
  getLecturersSuccess,
  getLecturersFail,
} from 'src/actions/lecturers/getLecturers';
import { GET_LECTURERS_FETCH } from 'src/actions/lecturers/actionTypes';

function* getLecturers(payload) {
  try {
    yield put(getLecturersRequest());
    const response = yield call(get, payload.url);
    const lecturers = response.map(lec => ({
      ...lec,
      value: lec.id,
      label: `${lec.lastName} ${lec.firstName[0]}. ${lec.patronymic[0]}.`,
    }));
    yield put(
      getLecturersSuccess({
        lecturers,
      })
    );
  } catch (error) {
    yield put(getLecturersFail(error));
  }
}

export default function* watchFetchGetLecturers() {
  yield takeLatest(GET_LECTURERS_FETCH, getLecturers);
}
