import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { RefObject } from 'react';
import { IAppState } from '../../types/state';

export interface IEditProfileState {
  selected: string;
}
export interface EditProfileComponent {
  userEmail: string | null;
}

export interface IEditProfileMapStateToProps {
  user: IAppState['api']['userData'];
}

export type TEditProfile = EditProfileComponent &
  InjectedIntlProps &
  IEditProfileMapStateToProps &
  RouteComponentProps<any, StaticContext>;
