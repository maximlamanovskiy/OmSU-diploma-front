import { SELECT_LESSON } from './actionTypes';

export const selectLesson = id => ({
  type: SELECT_LESSON,
  id,
});
