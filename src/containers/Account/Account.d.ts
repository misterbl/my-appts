import { IProfileFormFormData } from './../ProfileForm/ProfileForm.d';
import { IAppState } from './../../types/state.d';
import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IAccountFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}

export interface IAccountMapStateToProps {
  user: IAppState['api']['userData'];
}
export type IAccountComponent = IAccountMapStateToProps &
  InjectedIntlProps & FormikProps<IProfileFormFormData> &
  RouteComponentProps<any, StaticContext>;
