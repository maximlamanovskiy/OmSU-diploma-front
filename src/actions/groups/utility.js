import { SELECT_GROUP, SET_GROUPS } from './actionTypes';

export const selectGroup = groupId => ({
  type: SELECT_GROUP,
  groupId,
});

export const setGroups = groups => ({
  type: SET_GROUPS,
  groups,
});
