import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { openDialogWindow } from 'src/actions/utility/dialogWindow';
import { getLessonFetch } from 'src/actions/schedule/getLesson';
import { SELECT_LESSON } from 'src/actions/utility/actionTypes';
import { schedule } from 'src/constants/paths';

function* selectLesson(payload) {
  yield put(getLessonFetch(payload.id));
  yield put(openDialogWindow());
  yield put(push(`${schedule}#lesson=${payload.id}`));
}

export default function* watchSelectLesson() {
  yield takeLatest(SELECT_LESSON, selectLesson);
}
