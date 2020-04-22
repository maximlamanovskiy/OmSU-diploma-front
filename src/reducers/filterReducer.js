import * as types from 'src/actions/filter/actionTypes';

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

    default: {
      return state;
    }
  }
};
