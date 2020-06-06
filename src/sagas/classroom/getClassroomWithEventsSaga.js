import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getClassroomWithEventsRequest,
  getClassroomWithEventsSuccess,
  getClassroomWithEventsFail,
  getClassroomForRescheduleRequest,
  getClassroomForRescheduleSuccess,
  getClassroomForRescheduleFail,
  getClassroomForClassroomsRequest,
  getClassroomForClassroomsSuccess,
  getClassroomForClassroomsFail,
} from 'src/actions/classrooms/getClassroomWithEvents';
import { isWeekEven } from 'src/utils/date';
import {
  GET_CLASSROOM_WITH_EVENTS_FETCH,
  GET_CLASSROOM_FOR_RESCHEDULE_FETCH,
  GET_CLASSROOM_FOR_CLASSROOMS_FETCH,
} from 'src/actions/classrooms/actionTypes';

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

function* getClassroomForReschedule(payload) {
  try {
    yield put(getClassroomForRescheduleRequest());
    const response = yield call(get, payload.url);
    const interval = isWeekEven(new Date(payload.date)) ? 'EACH_ODD_WEEK' : 'EACH_EVEN_WEEK';
    const events = response.events.filter(item =>
      item.eventPeriods.some(period => period.interval !== interval)
    );
    yield put(getClassroomForRescheduleSuccess({ events }));
  } catch (error) {
    yield put(getClassroomForRescheduleFail(error));
  }
}

function* getClassroomForClassrooms(payload) {
  try {
    yield put(getClassroomForClassroomsRequest());
    const response = yield call(get, payload.url);
    const interval = isWeekEven(new Date(payload.date)) ? 'EACH_ODD_WEEK' : 'EACH_EVEN_WEEK';
    const events = response.events.filter(item =>
      item.eventPeriods.some(period => period.interval !== interval)
    );
    const classroomEvents = {};
    classroomEvents[payload.id] = events;
    yield put(getClassroomForClassroomsSuccess({ events: classroomEvents }));
  } catch (error) {
    yield put(getClassroomForClassroomsFail(error));
  }
}

export default function* watchFetchGetClassroomWithEvents() {
  yield takeLatest(GET_CLASSROOM_WITH_EVENTS_FETCH, getClassroomWithEvents);
  yield takeLatest(GET_CLASSROOM_FOR_RESCHEDULE_FETCH, getClassroomForReschedule);
  yield takeEvery(GET_CLASSROOM_FOR_CLASSROOMS_FETCH, getClassroomForClassrooms);
}
