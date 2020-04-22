import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getTimeBlocksRequest,
  getTimeBlocksSuccess,
  getTimeBlocksFail,
} from 'src/actions/timeBlocks/getTimeBlocks';
import { GET_TIME_BLOCKS_FETCH } from 'src/actions/timeBlocks/actionTypes';

function* getTimeBlocks(payload) {
  try {
    yield put(getTimeBlocksRequest());
    const response = yield call(get, payload.url);
    yield put(getTimeBlocksSuccess({ timeBlocks: response }));
  } catch (error) {
    yield put(getTimeBlocksFail(error));
  }
}

export default function* watchFetchTimeBlocks() {
  yield takeLatest(GET_TIME_BLOCKS_FETCH, getTimeBlocks);
}
