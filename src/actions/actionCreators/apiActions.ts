import { makeActionCreator } from '../../utils/actionCreator';
// import { apiActionTypes } from './actionTypes';

export const saveUserData = makeActionCreator('SAVE_USER_DATA', 'data');

export const saveUserEmail = makeActionCreator('SAVE_USER_EMAIL', 'email');
