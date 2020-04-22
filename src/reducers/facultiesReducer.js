import * as types from 'src/actions/faculties/actionTypes';

const initialState = {
  faculties: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FACULTIES_REQUEST: {
      return {
        ...state,
        faculties: [],
        isLoading: true,
        error: null,
      };
    }

    case types.GET_FACULTIES_SUCCESS: {
      return {
        ...state,
        faculties: action.faculties,
        isLoading: false,
      };
    }

    case types.GET_FACULTIES_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
