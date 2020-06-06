import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import { getEventRequest, getEventSuccess, getEventFail } from 'src/actions/event/getEvent';
import { GET_EVENT_FETCH } from 'src/actions/event/actionTypes';
import { convertPeriods } from 'src/utils/date';

function* getEvent(payload) {
  try {
    yield put(getEventRequest());
    const response = yield call(get, payload.url);
    const dates = [];
    response.eventPeriods.forEach(convertPeriods(dates));
    yield put(
      getEventSuccess({
        event: {
          ...response,
          periods: response.eventPeriods,
          dates,
        },
      })
    );
  } catch (error) {
    yield put(getEventFail(error));
  }
}

export default function* watchFetchGetEvent() {
  yield takeLatest(GET_EVENT_FETCH, getEvent);
}
