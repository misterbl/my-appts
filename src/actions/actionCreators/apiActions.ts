import { makeActionCreator } from '../../utils/actionCreator';
// import { apiActionTypes } from './actionTypes';

export const saveBooks = makeActionCreator('SAVE_BOOKS', 'data');

export const saveUserData = makeActionCreator('SAVE_USER_DATA', 'data');
