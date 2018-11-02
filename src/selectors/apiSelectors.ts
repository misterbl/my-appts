import { createSelector } from 'reselect';
import { IAppState } from '../types/state.d';

export const apiSelector = (state: IAppState) => state.api;

export const getUserData = createSelector(
  apiSelector,
  api => api && api.userData && api.userData,
);

export const getUseEmail = createSelector(
  apiSelector,
  api => api && api.userData && api.userData && api.userData.email,
);
