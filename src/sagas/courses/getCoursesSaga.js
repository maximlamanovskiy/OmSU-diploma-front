import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_COURSES_FETCH } from 'src/actions/courses/actioType';
import { get } from 'src/fetcher/fetcher';
import {
  getCoursesRequest,
  getCoursesSuccess,
  getCoursesFail,
} from 'src/actions/courses/getCourses';

function* getCourses(payload) {
  try {
    yield put(getCoursesRequest());
    const response = yield call(get, payload.url);
    yield put(
      getCoursesSuccess({
        courses: response
          .filter(course => course.groups)
          .map(course => ({
            ...course,
            label: `${course.startYear}/${course.finishYear}`,
            value: course.id,
          })),
      })
    );
  } catch (error) {
    yield put(getCoursesFail(error));
  }
}

export default function* watchFetchGetCourses() {
  yield takeLatest(GET_COURSES_FETCH, getCourses);
}
