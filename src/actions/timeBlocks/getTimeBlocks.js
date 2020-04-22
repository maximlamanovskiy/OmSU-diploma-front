import {
  GET_TIME_BLOCKS_FETCH,
  GET_TIME_BLOCKS_REQUEST,
  GET_TIME_BLOCKS_SUCCESS,
  GET_TIME_BLOCKS_FAIL,
} from './actionTypes';

export const getTimeBlocksFetch = () => ({
  type: GET_TIME_BLOCKS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/timeblocks`,
});

export const getTimeBlocksRequest = () => ({
  type: GET_TIME_BLOCKS_REQUEST,
});

export const getTimeBlocksSuccess = response => ({
  type: GET_TIME_BLOCKS_SUCCESS,
  timeBlocks: response.timeBlocks,
});

export const getTimeBlocksFail = error => ({
  type: GET_TIME_BLOCKS_FAIL,
  error,
});
