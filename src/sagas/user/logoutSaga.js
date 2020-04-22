import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { remove } from 'src/fetcher/fetcher';
import { logoutFail, logoutRequest, logoutSuccess } from 'src/actions/user/logout';
import { LOGOUT_FETCH } from 'src/actions/user/actionTypes';

import paths from 'src/constants/paths';

function* fetchLogout(payload) {
  try {
    yield put(logoutRequest());
    yield call(remove, payload.url);
    yield put(logoutSuccess());
    yield put(push(paths.login));
  } catch (error) {
    yield put(logoutFail(error));
    yield put(push(paths.login));
  }
}

export default function* watchFetchLogout() {
  yield takeLatest(LOGOUT_FETCH, fetchLogout);
}
