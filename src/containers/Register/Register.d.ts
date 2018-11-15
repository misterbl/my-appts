import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { IAppState } from '../../types/state';

export interface IRegisterFormData {
  email?: string;
  password?: string;
}

export interface IRegisterFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}
export interface IRegisterFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IRegisterState {
  userExists: boolean;
}

export type IRegisterComponent = FormikProps<IRegisterFormData> &
  IRegisterFormDispatchToProps &
  IRegisterFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
