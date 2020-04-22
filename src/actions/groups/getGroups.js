import {
  GET_GROUPS_FETCH,
  GET_GROUPS_REQUEST,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
} from './actionTypes';

export const getGroupsFetch = () => ({
  type: GET_GROUPS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/groups`,
});

export const getGroupsRequest = () => ({
  type: GET_GROUPS_REQUEST,
});

export const getGroupsSuccess = response => ({
  type: GET_GROUPS_SUCCESS,
  groups: response.groups,
});

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  error,
});
