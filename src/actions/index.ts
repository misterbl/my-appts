import { getUserData, updateUser } from './thunks/apiThunk';
import { saveUserData, saveUserEmail } from './actionCreators/apiActions';

export const apiActions = {
  saveUserData,
  getUserData,
  updateUser,
  saveUserEmail,
};
