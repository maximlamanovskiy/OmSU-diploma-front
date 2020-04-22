import * as types from 'src/actions/event/actionTypes';

const initialState = {
  event: {
    required: false,
    lecturerId: -1,
    timeBlockId: -1,
    dateTo: '',
    dateFrom: '',
    interval: '',
    comment: '',
  },
  isFree: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_EVENT: {
      return {
        ...state,
        event: { ...state.event, ...action.event },
      };
    }

    case types.CLEAR_EVENT: {
      return {
        ...state,
        event: {
          required: false,
          lecturerId: -1,
          timeBlockId: -1,
          dateTo: '',
          dateFrom: '',
          interval: '',
          comment: '',
        },
      };
    }

    case types.CHANGE_IS_FREE: {
      return {
        ...state,
        isFree: action.isFree,
      };
    }

    case types.CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        event: {
          ...state.event,
          id: action.event.id,
        },
      };
    }

    default: {
      return state;
    }
  }
};
