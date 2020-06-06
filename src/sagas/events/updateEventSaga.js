import { takeLatest, put, call } from 'redux-saga/effects';

import { update } from 'src/fetcher/fetcher';
import {
  updateEventRequest,
  updateEventSuccess,
  updateEventFail,
} from 'src/actions/event/updateEvent';
import { getEventSuccess } from 'src/actions/event/getEvent';
import { UPDATE_EVENT_FETCH } from 'src/actions/event/actionTypes';

import { convertPeriods } from 'src/utils/date';

function* updateEvent(payload) {
  try {
    yield put(updateEventRequest());
    yield call(update, payload.url, payload.body);
    const dates = [];
    payload.body.periods.forEach(convertPeriods(dates));
    yield put(
      getEventSuccess({
        event: {
          ...payload.body,
          dates,
        },
      })
    );
    yield put(updateEventSuccess());
  } catch (error) {
    yield put(updateEventFail(error));
  }
}

export default function* watchFetchUpdateEvent() {
  yield takeLatest(UPDATE_EVENT_FETCH, updateEvent);
}
