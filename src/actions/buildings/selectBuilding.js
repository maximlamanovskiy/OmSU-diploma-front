import { SELECT_BUILDING } from './actionTypes';

export const selectBuilding = id => ({
  type: SELECT_BUILDING,
  id,
});
