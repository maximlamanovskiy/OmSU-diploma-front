import { takeLatest, put, call } from 'redux-saga/effects';

import { CREATE_SCHEDULE_ITEM_FETCH } from 'src/actions/schedule/actionTypes';
import {
  createScheduleItemRequest,
  createScheduleItemSuccess,
  createScheduleItemFail,
} from 'src/actions/schedule/createScheduleItem';
import { post } from 'src/fetcher/fetcher';

function* createScheduleItem(payload) {
  try {
    yield put(createScheduleItemRequest());
    const response = yield call(post, payload.url, payload.scheduleItem);
    const { id, eventPeriod } = Object.values(Object.values(response)[0])[0][0];
    const scheduleItem = {
      ...payload.scheduleItem,
      id,
      event: {
        ...payload.scheduleItem.event,
        periods: [
          ...payload.scheduleItem.event.periods.map(item => ({
            ...item,
            eventPeriodId: eventPeriod.id,
          })),
        ],
      },
    };
    yield put(createScheduleItemSuccess({ scheduleItem }));
  } catch (error) {
    yield put(createScheduleItemFail(error));
  }
}

export default function* watchFetchCreateScheduleItem() {
  yield takeLatest(CREATE_SCHEDULE_ITEM_FETCH, createScheduleItem);
}
