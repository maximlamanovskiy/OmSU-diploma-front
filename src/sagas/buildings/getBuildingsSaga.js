import { takeLatest, put, call } from 'redux-saga/effects';

import { get } from 'src/fetcher/fetcher';
import {
  getBuildingRequest,
  getBuildingSuccess,
  getBuildingsFail,
} from 'src/actions/buildings/getBuildingsAction';
import { GET_BUILDINGS_FETCH } from 'src/actions/buildings/actionTypes';

function* getBuildings(payload) {
  try {
    yield put(getBuildingRequest());
    const response = yield call(get, payload.url);
    const buildings = response.map(building => ({
      building,
      value: building.id,
      label: `${building.number} - ${building.address}`,
    }));
    yield put(getBuildingSuccess({ buildings }));
  } catch (error) {
    yield put(getBuildingsFail(error));
  }
}

export default function* watchFetchGetBuildings() {
  yield takeLatest(GET_BUILDINGS_FETCH, getBuildings);
}
