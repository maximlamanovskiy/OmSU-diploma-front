import * as types from 'src/actions/timeBlocks/actionTypes';

const initialState = {
  isLoading: false,
  timeBlocks: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TIME_BLOCKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        timeBlocks: [],
        error: null,
      };
    }

    case types.GET_TIME_BLOCKS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        timeBlocks: action.timeBlocks,
        error: null,
      };
    }

    case types.GET_TIME_BLOCKS_FAIL: {
      return {
        ...state,
        isLoading: false,
        timeBlocks: [],
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};
