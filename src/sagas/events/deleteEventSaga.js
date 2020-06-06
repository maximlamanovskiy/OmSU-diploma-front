import { takeLatest, put, call } from 'redux-saga/effects';

import { remove } from 'src/fetcher/fetcher';
import {
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
} from 'src/actions/event/deleteEvent';
import { changeIsFree } from 'src/actions/event/eventUtility';
import { DELETE_EVENT_FETCH } from 'src/actions/event/actionTypes';

function* deleteEvent(payload) {
  try {
    yield put(deleteEventRequest());
    yield call(remove, payload.url);
    yield put(deleteEventSuccess(payload.id));
    yield put(changeIsFree(false));
  } catch (error) {
    yield put(deleteEventFail(error));
  }
}

export default function* watchFetchDeleteEvent() {
  yield takeLatest(DELETE_EVENT_FETCH, deleteEvent);
}
