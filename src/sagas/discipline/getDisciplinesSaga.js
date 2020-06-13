import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_DISCIPLINES_FETCH } from 'src/actions/discipline/actionTypes';
import {
  getDisciplinesRequest,
  getDisciplinesSuccess,
  getDisciplinesFail,
} from 'src/actions/discipline/getDisciplines';
import { get } from 'src/fetcher/fetcher';

function* getDisciplines(payload) {
  try {
    yield put(getDisciplinesRequest());
    const response = yield call(get, payload.url);
    const disciplines = response.map(dis => ({
      ...dis,
      label: dis.name,
      value: dis.id,
    }));
    yield put(getDisciplinesSuccess({ disciplines }));
  } catch (error) {
    yield put(getDisciplinesFail(error));
  }
}

export default function* watchFetchGetDisciplines() {
  yield takeLatest(GET_DISCIPLINES_FETCH, getDisciplines);
}
