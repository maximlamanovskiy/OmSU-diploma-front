import * as types from 'src/actions/discipline/actionTypes';

const initialState = {
  disciplines: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DISCIPLINES_REQUEST: {
      return {
        ...state,
        disciplines: [],
        isLoading: true,
        error: null,
      };
    }
    case types.GET_DISCIPLINES_SUCCESS: {
      return {
        ...state,
        disciplines: action.disciplines,
        isLoading: false,
      };
    }
    case types.GET_DISCIPLINES_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
