import * as types from 'src/actions/utility/actionTypes';

const initialState = {
  date: new Date().toISOString().split('T')[0],
  isOpen: false,
  header: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATE: {
      return {
        ...state,
        date: action.date,
      };
    }
    case types.OPEN_DIALOG_WINDOW: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case types.CLOSE_DIALOG_WINDOW: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
