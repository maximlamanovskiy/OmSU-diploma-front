import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getDepartmentsRequest,
  getDepartmentsSuccess,
  getDepartmentsFail,
} from 'src/actions/departments/getDepartments';
import { GET_DEPARTMENTS_FETCH } from 'src/actions/departments/actionTypes';

function* getDepartments(payload) {
  try {
    yield put(getDepartmentsRequest());
    const response = yield call(get, payload.url);
    const departments = response.map(dep => ({
      ...dep,
      value: dep.id,
      label: dep.chair,
    }));
    yield put(
      getDepartmentsSuccess({
        departments,
      })
    );
  } catch (error) {
    yield put(getDepartmentsFail(error));
  }
}

export default function* watchFetchGetDepartments() {
  yield takeLatest(GET_DEPARTMENTS_FETCH, getDepartments);
}
