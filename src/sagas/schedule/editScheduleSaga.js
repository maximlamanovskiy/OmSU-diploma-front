import { takeLatest, put, call } from 'redux-saga/effects';

import { EDIT_SCHEDULE_FETCH } from 'src/actions/schedule/actionTypes';
import {
  editScheduleRequest,
  editScheduleSuccess,
  editScheduleFail,
} from 'src/actions/schedule/editSchedule';
import { setScheduleEditorOpen } from 'src/actions/utility/setScheduleEditorOpen';
import { post } from 'src/fetcher/fetcher';

function* editSchedule(payload) {
  try {
    yield put(editScheduleRequest());
    // let response = yield call(get, payload.urlGet);
    // const isCreated = response.schedules.values().every(item => !!item.schedule);
    // if (!isCreated) {
    let response = yield call(post, payload.urlPost, {
      courseId: payload.courseId,
      semester: payload.semester,
      studyYear: payload.year,
    });
    const schedules = {};
    response.course.groups.forEach(group => {
      schedules[group.name] = { schedule: [] };
    });
    response = {
      ...response,
      schedules,
    };
    // } else {
    //   const groups = response.schedules.values();
    //   groups.forEach(item => item)
    // }
    yield put(editScheduleSuccess(response));
    yield put(setScheduleEditorOpen(true));
  } catch (error) {
    alert('Такое расписание уже существует');
    yield put(editScheduleFail(error));
  }
}

export default function* watchFetchEditSchedule() {
  yield takeLatest(EDIT_SCHEDULE_FETCH, editSchedule);
}
