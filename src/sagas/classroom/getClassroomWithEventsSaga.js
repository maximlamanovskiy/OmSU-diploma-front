import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getClassroomWithEventsRequest,
  getClassroomWithEventsSuccess,
  getClassroomWithEventsFail,
} from 'src/actions/classrooms/getClassroomWithEvents';
import { isWeekEven } from 'src/utils/date';
import { GET_CLASSROOM_WITH_EVENTS_FETCH } from 'src/actions/classrooms/actionTypes';

function* getClassroomWithEvents(payload) {
  try {
    yield put(getClassroomWithEventsRequest());
    const response = yield call(get, payload.url);
    const interval = isWeekEven(new Date(payload.date)) ? 'EACH_ODD_WEEK' : 'EACH_EVEN_WEEK';
    const events = response.events.filter(item =>
      item.eventPeriods.some(period => period.interval !== interval)
    );
    yield put(
      getClassroomWithEventsSuccess({
        classroom: {
          ...response.classroom,
          number: response.classroom.classroomNumber,
        },
        events,
      })
    );
  } catch (error) {
    yield put(getClassroomWithEventsFail(error));
  }
}

export default function* watchFetchGetClassroomWithEvents() {
  yield takeLatest(GET_CLASSROOM_WITH_EVENTS_FETCH, getClassroomWithEvents);
}
