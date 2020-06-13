import * as types from 'src/actions/filter/actionTypes';
import { CLEAR_COURSES } from 'src/actions/courses/actioType';

const initialState = {
  filter: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FILTER: {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.filter,
        },
      };
    }
    case types.CLEAR_FILTER: {
      return {
        ...state,
        filter: {},
      };
    }
    case CLEAR_COURSES: {
      return {
        ...state,
        filter: {
          ...state.filter,
          id: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};
