import { CLEAR_CLASSROOMS, CLEAR_CLASSROOM } from './actionTypes';

export const clearClassrooms = () => ({
  type: CLEAR_CLASSROOMS,
});

export const clearClassroom = () => ({
  type: CLEAR_CLASSROOM,
});
