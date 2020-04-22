import { takeLatest, call, put } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import { getLessonRequest, getLessonSuccess, getLessonFail } from 'src/actions/schedule/getLesson';
import { GET_LESSON_FETCH } from 'src/actions/schedule/actionTypes';

function* getLesson(payload) {
  try {
    yield put(getLessonRequest());
    const response = yield call(get, payload.url);
    yield put(getLessonSuccess({ lesson: response }));
  } catch (error) {
    yield put(getLessonFail(error));
  }
}

export default function* watchFetchGetLesson() {
  yield takeLatest(GET_LESSON_FETCH, getLesson);
}
