import { UPDATE_RESCHEDULE, CLEAR_RESCHEDULE } from 'src/actions/utility/actionTypes';
import {
  GET_CLASSROOMS_FOR_RESCHEDULE_REQUEST,
  GET_CLASSROOMS_FOR_RESCHEDULE_SUCCESS,
  GET_CLASSROOMS_FOR_RESCHEDULE_FAIL,
  GET_CLASSROOM_FOR_RESCHEDULE_REQUEST,
  GET_CLASSROOM_FOR_RESCHEDULE_SUCCESS,
  GET_CLASSROOM_FOR_RESCHEDULE_FAIL,
} from 'src/actions/classrooms/actionTypes';

const initialState = {
  rescheduleClassrooms: [],
  rescheduleEvents: [],
  reschedule: {
    classroomId: null,
    timeBlockId: null,
    from: null,
    to: null,
    period: null,
  },
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESCHEDULE: {
      return {
        ...state,
        reschedule: {
          ...state.reschedule,
          ...action.reschedule,
        },
      };
    }

    case GET_CLASSROOMS_FOR_RESCHEDULE_REQUEST: {
      return {
        ...state,
        rescheduleClassrooms: [],
        error: null,
        isLoading: true,
      };
    }

    case GET_CLASSROOMS_FOR_RESCHEDULE_SUCCESS: {
      return {
        ...state,
        rescheduleClassrooms: action.classrooms,
        isLoading: false,
      };
    }

    case GET_CLASSROOMS_FOR_RESCHEDULE_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    case GET_CLASSROOM_FOR_RESCHEDULE_REQUEST: {
      return {
        ...state,
        rescheduleEvents: [],
        error: null,
        isLoading: true,
      };
    }

    case GET_CLASSROOM_FOR_RESCHEDULE_SUCCESS: {
      return {
        ...state,
        rescheduleEvents: action.events,
        isLoading: false,
      };
    }

    case GET_CLASSROOM_FOR_RESCHEDULE_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    case CLEAR_RESCHEDULE: {
      return {
        ...state,
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};
