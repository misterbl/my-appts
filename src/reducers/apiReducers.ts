import { AnyAction } from 'redux';
// import { IAppState } from '../types/state.d';
// import { apiActionTypes } from '../actions/actionTypes';

// type State = IAppState['api'];
export interface IState {books: [] | null};


export const saveBooks = (
  state: IState['books'] = null,
  action: AnyAction,
): IState['books'] => {
  console.log("reducer");
  
  switch (action.type) {
    case 'SAVE_BOOKS':
      return action.data;
    default:
      return state;
  }
};

// export const teamData = (
//   state: State['teamData'] = null,
//   action: AnyAction,
// ): State['teamData'] => {
//   switch (action.type) {
//     case apiActionTypes.SAVE_TEAM_ID:
//       return action.teamId;
//     default:
//       return state;
//   }
// };
