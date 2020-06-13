import { takeLatest, put, call } from 'redux-saga/effects';

import { DELETE_SCHEDULE_ITEM_FETCH } from 'src/actions/schedule/actionTypes';
import {
  deleteScheduleItemsRequest,
  deleteScheduleItemsSuccess,
  deleteScheduleItemsFail,
} from 'src/actions/schedule/deleteScheduleItem';
import { remove } from 'src/fetcher/fetcher';

function* deleteScheduleItem(payload) {
  try {
    yield put(deleteScheduleItemsRequest());
    yield call(remove, payload.url);
    yield put(deleteScheduleItemsSuccess(payload.id));
  } catch (error) {
    yield put(deleteScheduleItemsFail(error));
  }
}

export default function* watchFetchDeleteScheduleItem() {
  yield takeLatest(DELETE_SCHEDULE_ITEM_FETCH, deleteScheduleItem);
}
