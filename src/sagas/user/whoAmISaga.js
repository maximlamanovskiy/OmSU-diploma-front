import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { get } from 'src/fetcher/fetcher';
import { whoAmIRequest, whoAmISuccess, whoAmIFail } from 'src/actions/user/whoAmI';
import { CHECK_AUTH_FETCH, CHECK_USER_FETCH } from 'src/actions/user/actionTypes';

import paths from 'src/constants/paths';

function* checkAuth(payload) {
  try {
    yield put(whoAmIRequest());
    const response = yield call(get, payload.url);
    yield put(whoAmISuccess(response));
    yield put(push(paths.classrooms));
  } catch (error) {
    yield put(whoAmIFail(error));
  }
}

function* checkUser(payload) {
  try {
    yield put(whoAmIRequest());
    const response = yield call(get, payload.url);
    yield put(whoAmISuccess(response));
  } catch (error) {
    yield put(whoAmIFail(error));
    yield put(push(paths.login));
  }
}

export default function* watchFetchWhoAmI() {
  yield takeLatest(CHECK_AUTH_FETCH, checkAuth);
  yield takeLatest(CHECK_USER_FETCH, checkUser);
}
