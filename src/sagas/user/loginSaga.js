import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { post } from 'src/fetcher/fetcher';
import { loginFail, loginRequest, loginSuccess } from 'src/actions/user/login';
import { AUTHORIZE_FETCH } from 'src/actions/user/actionTypes';

import paths from 'src/constants/paths';

function* fetchLogin(payload) {
  try {
    yield put(loginRequest(payload.body));
    yield call(post, payload.url, payload.body);
    yield put(loginSuccess());
    yield put(push(paths.classrooms));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export default function* watchFetchLogin() {
  yield takeLatest(AUTHORIZE_FETCH, fetchLogin);
}
