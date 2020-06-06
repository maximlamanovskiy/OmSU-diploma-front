import {
  CLEAR_CLASSROOMS,
  CLEAR_CLASSROOM,
  SET_CLASSROOMS_PAGE,
  SELECT_CLASSROOM,
  CLEAR_CLASSROOMS_EVENTS,
} from './actionTypes';

export const clearClassrooms = () => ({
  type: CLEAR_CLASSROOMS,
});

export const clearClassroom = () => ({
  type: CLEAR_CLASSROOM,
});

export const setPage = page => ({
  type: SET_CLASSROOMS_PAGE,
  page,
});

export const selectClassroom = id => ({
  type: SELECT_CLASSROOM,
  id,
});

export const clearClassroomsEvents = () => ({
  type: CLEAR_CLASSROOMS_EVENTS,
});
