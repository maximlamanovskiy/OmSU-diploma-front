import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import { getPeriodsRequest, getPeriodsSuccess, getPeriodsFail } from 'src/actions/event/getPeriods';
import { GET_PERIODS_FETCH } from 'src/actions/event/actionTypes';

function* getPeriods(payload) {
  try {
    yield put(getPeriodsRequest());
    const response = yield call(get, payload.url);
    yield put(getPeriodsSuccess({ periods: response.eventPeriods }));
  } catch (error) {
    yield put(getPeriodsFail(error));
  }
}

export default function* watchFetchGetPeriods() {
  yield takeLatest(GET_PERIODS_FETCH, getPeriods);
}
