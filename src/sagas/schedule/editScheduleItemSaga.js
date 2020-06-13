import { takeLatest, put, call } from 'redux-saga/effects';

import { EDIT_SCHEDULE_ITEM_FETCH } from 'src/actions/schedule/actionTypes';
import {
  editScheduleItemRequest,
  editScheduleItemSuccess,
  editScheduleItemFail,
} from 'src/actions/schedule/editScheduleItem';
import { update } from 'src/fetcher/fetcher';

function* editScheduleItem(payload) {
  try {
    yield put(editScheduleItemRequest());
    yield call(update, payload.url, payload.scheduleItem);
    yield put(editScheduleItemSuccess(payload.id, payload.scheduleItem));
  } catch (error) {
    yield put(editScheduleItemFail(error));
  }
}

export default function* watchFetchEditScheduleItem() {
  yield takeLatest(EDIT_SCHEDULE_ITEM_FETCH, editScheduleItem);
}
