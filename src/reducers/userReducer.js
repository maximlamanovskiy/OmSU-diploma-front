import * as types from 'src/actions/user/actionTypes';

const initialState = {
  isAuthorized: false,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZE_SUCCESS: {
      return {
        ...state,
        isAuthorized: true,
        isLoading: false,
        error: null,
      };
    }

    case types.AUTHORIZE_FAIL: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
        error: action.error,
      };
    }

    case types.AUTHORIZE_REQUEST: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: true,
        error: null,
      };
    }

    case types.REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }

    case types.REGISTER_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.WHO_AM_I_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.WHO_AM_I_SUCCESS: {
      return {
        ...state,
        isAuthorized: true,
        isLoading: false,
        error: null,
      };
    }

    case types.WHO_AM_I_FAIL: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
        whoAmIError: action.error,
      };
    }

    case types.CLEAR_USER_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    case types.LOGOUT_REQUEST: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: true,
        error: null,
      };
    }

    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case types.LOGOUT_FAIL: {
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
