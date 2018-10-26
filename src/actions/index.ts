import { getUserData, updateUser } from './thunks/apiThunk';
import { saveUserData } from './actionCreators/apiActions';

export const apiActions = {
  saveUserData,
  getUserData,
  updateUser
};
