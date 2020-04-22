import { takeLatest, call, put } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getScheduleRequest,
  getScheduleSuccess,
  getScheduleFail,
} from 'src/actions/schedule/getSchedule';
import { GET_SCHEDULE_FETCH } from 'src/actions/schedule/actionTypes';

function* getSchedule(payload) {
  try {
    yield put(getScheduleRequest());
    const response = yield call(get, payload.url);
    yield put(getScheduleSuccess({ schedule: response.scheduleItems }));
  } catch (error) {
    yield put(getScheduleFail(error));
  }
}

export default function* watchFetchGetSchedule() {
  yield takeLatest(GET_SCHEDULE_FETCH, getSchedule);
}
