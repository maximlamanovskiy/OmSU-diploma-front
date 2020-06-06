import { takeLatest, put, call } from 'redux-saga/effects';

import { remove } from 'src/fetcher/fetcher';
import {
  cancelEventRequest,
  cancelEventSuccess,
  cancelEventFail,
} from 'src/actions/event/cancelEvent';
import { clearReschedule } from 'src/actions/utility/reschedule';
import { CANCEL_EVENT_FETCH } from 'src/actions/event/actionTypes';

function* cancelEvent(payload) {
  try {
    yield put(cancelEventRequest());
    yield call(remove, payload.url, payload.body);
    yield put(cancelEventSuccess(payload.date));
    yield put(clearReschedule());
  } catch (error) {
    yield put(cancelEventFail(error));
  }
}

export default function* watchFetchCancelEvent() {
  yield takeLatest(CANCEL_EVENT_FETCH, cancelEvent);
}
