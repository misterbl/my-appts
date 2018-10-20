import { makeActionCreator } from '../utills/actionCreator';
// import { apiActionTypes } from './actionTypes';

export const saveBooks = makeActionCreator(
  'SAVE_BOOKS',
  'data',
);
