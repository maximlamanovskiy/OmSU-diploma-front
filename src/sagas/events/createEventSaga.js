import { takeLatest, put, call } from 'redux-saga/effects';

import { post } from 'src/fetcher/fetcher';
import {
  createEventRequest,
  createEventSuccess,
  createEventFail,
} from 'src/actions/event/createEvent';
import { CREATE_EVENT_FETCH } from 'src/actions/event/actionTypes';

function* createEvent(payload) {
  try {
    yield put(createEventRequest());
    const response = yield call(post, payload.url, payload.event);
    yield put(createEventSuccess({ event: response }));
  } catch (error) {
    yield put(createEventFail(error));
  }
}

export default function* watchFetchCreateEvent() {
  yield takeLatest(CREATE_EVENT_FETCH, createEvent);
}
