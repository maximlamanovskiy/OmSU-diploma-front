import { OCCUPY_CLASSROOM, EDIT_CLASSROOM, OCCUPY_CLASSROOM_WITH_TIME } from './actionTypes';

export const occupyClassroom = (id, date) => ({
  type: OCCUPY_CLASSROOM,
  id,
  date,
});

export const editClassroom = id => ({
  type: EDIT_CLASSROOM,
  id,
});

export const occupyClassroomWithTime = (id, date, timeIndex) => ({
  type: OCCUPY_CLASSROOM_WITH_TIME,
  id,
  date,
  timeIndex,
});
