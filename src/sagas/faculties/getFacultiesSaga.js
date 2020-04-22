import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getFacultiesRequest,
  getFacultiesSuccess,
  getFacultiesFail,
} from 'src/actions/faculties/getFaculties';
import { GET_FACULTIES_FETCH } from 'src/actions/faculties/actionTypes';

function* getFaculties(payload) {
  try {
    yield put(getFacultiesRequest());
    const response = yield call(get, payload.url);
    const faculties = response.map(fac => ({
      ...fac,
      value: fac.id,
      label: fac.name,
    }));
    yield put(
      getFacultiesSuccess({
        faculties,
      })
    );
  } catch (error) {
    yield put(getFacultiesFail(error));
  }
}

export default function* watchFetchGetFaculties() {
  yield takeLatest(GET_FACULTIES_FETCH, getFaculties);
}
