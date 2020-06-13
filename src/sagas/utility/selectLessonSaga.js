import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { openScheduleDialogWindow } from 'src/actions/utility/dialogWindow';
import { getLessonFetch } from 'src/actions/schedule/getLesson';
import { SELECT_LESSON } from 'src/actions/utility/actionTypes';
import { schedule } from 'src/constants/paths';

function* selectLesson(payload) {
  yield put(getLessonFetch(payload.id));
  yield put(openScheduleDialogWindow());
  yield put(push(`${schedule}#lesson=${payload.id}`));
}

export default function* watchSelectLesson() {
  yield takeLatest(SELECT_LESSON, selectLesson);
}
