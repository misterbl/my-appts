import { AnyAction } from 'redux';
import { IAppState } from '../types/state.d';
// import { apiActionTypes } from '../actions/actionTypes';

type State = IAppState['api'];

// export const saveBooks = (
//   state: State['books'] = null,
//   action: AnyAction,
// ): State['books'] => {
//   switch (action.type) {
//     case 'SAVE_BOOKS':
//       return action.data;
//     default:
//       return state;
//   }
// };

export const saveUserData = (
  state: State['userData'] = null,
  action: AnyAction,
): State['userData'] => {
  switch (action.type) {
    case 'SAVE_USER_DATA':
      return action.data;
    default:
      return state;
  }
};
