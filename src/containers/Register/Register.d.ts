import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IRegisterFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}

export type IRegisterComponent = FormikProps<IRegisterFormData> &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
