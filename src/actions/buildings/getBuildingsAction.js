import {
  GET_BUILDINGS_FETCH,
  GET_BUILDINGS_REQUEST,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_FAIL,
} from './actionTypes';

export const getBuildingsFetch = () => ({
  type: GET_BUILDINGS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/buildings`,
});

export const getBuildingRequest = () => ({
  type: GET_BUILDINGS_REQUEST,
});

export const getBuildingSuccess = response => ({
  type: GET_BUILDINGS_SUCCESS,
  buildings: response.buildings,
});

export const getBuildingsFail = error => ({
  type: GET_BUILDINGS_FAIL,
  error,
});
