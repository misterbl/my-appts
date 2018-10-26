import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { IAppState } from 'src/types/state';

export interface IRegisterFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}

export interface IRegisterFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}
export interface IRegisterFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export type IRegisterComponent = FormikProps<IRegisterFormData> &
  IRegisterFormDispatchToProps &
  IRegisterFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
