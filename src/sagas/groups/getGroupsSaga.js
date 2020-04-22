import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import { getGroupsRequest, getGroupsSuccess, getGroupsFail } from 'src/actions/groups/getGroups';
import { GET_GROUPS_FETCH } from 'src/actions/groups/actionTypes';

function* getGroups(payload) {
  try {
    yield put(getGroupsRequest());
    const response = yield call(get, payload.url);
    const groups = response.map(gr => ({
      ...gr,
      value: gr.id,
      label: gr.name,
    }));
    yield put(
      getGroupsSuccess({
        groups,
      })
    );
  } catch (error) {
    yield put(getGroupsFail(error));
  }
}

export default function* watchFetchGetGroups() {
  yield takeLatest(GET_GROUPS_FETCH, getGroups);
}
