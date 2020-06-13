import * as types from 'src/actions/groups/actionTypes';

const initialState = {
  groups: [],
  error: null,
  isLoading: false,
  groupId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_GROUPS_REQUEST: {
      return {
        ...state,
        groups: [],
        error: null,
        isLoading: true,
      };
    }
    case types.GET_GROUPS_SUCCESS: {
      return {
        ...state,
        groups: action.groups,
        isLoading: false,
      };
    }
    case types.GET_GROUPS_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case types.SELECT_GROUP: {
      return {
        ...state,
        groupId: action.groupId,
      };
    }
    case types.SET_GROUPS: {
      return {
        ...state,
        groups: action.groups,
      };
    }
    default: {
      return state;
    }
  }
};
