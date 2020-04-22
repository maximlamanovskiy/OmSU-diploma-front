import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { post } from 'src/fetcher/fetcher';
import { registerRequest, registerSuccess, registerFail } from 'src/actions/user/registration';
import { REGISTER_FETCH } from 'src/actions/user/actionTypes';

import paths from 'src/constants/paths';

function* register(payload) {
  try {
    yield put(registerRequest(payload.body));
    yield call(post, payload.url, payload.body);
    yield put(registerSuccess());
    yield put(push(paths.login));
  } catch (error) {
    yield put(registerFail(error));
  }
}

export default function* watchFetchRegistration() {
  yield takeLatest(REGISTER_FETCH, register);
}
