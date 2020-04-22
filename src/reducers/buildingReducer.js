import * as types from 'src/actions/buildings/actionTypes';

const initialState = {
  buildings: [],
  selectedId: -1,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BUILDINGS_REQUEST: {
      return {
        ...state,
        buildings: [],
        isLoading: true,
        error: null,
        selectedId: -1,
      };
    }

    case types.GET_BUILDINGS_SUCCESS: {
      return {
        ...state,
        buildings: [...action.buildings],
        isLoading: false,
      };
    }

    case types.GET_BUILDINGS_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    case types.SELECT_BUILDING: {
      return {
        ...state,
        selectedId: action.id,
      };
    }

    default: {
      return state;
    }
  }
};
