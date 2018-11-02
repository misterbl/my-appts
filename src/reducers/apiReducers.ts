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

export const userData = (
  state: State['userData'] = null,
  { type, data, email }: AnyAction,
): State['userData'] => {
  switch (type) {
    case 'SAVE_USER_EMAIL':
      return {
        ...(state as any),
        email,
      };
    case 'SAVE_USER_DATA':
      return data;
    default:
      return state;
  }
};
