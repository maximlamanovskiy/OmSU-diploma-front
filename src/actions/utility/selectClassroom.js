import { SELECT_CLASSROOM, OCCUPY_CLASSROOM, EDIT_CLASSROOM } from './actionTypes';

export const selectClassroom = (id, date) => ({
  type: SELECT_CLASSROOM,
  id,
  date,
});

export const occupyClassroom = (id, date) => ({
  type: OCCUPY_CLASSROOM,
  id,
  date,
});

export const editClassroom = id => ({
  type: EDIT_CLASSROOM,
  id,
});
