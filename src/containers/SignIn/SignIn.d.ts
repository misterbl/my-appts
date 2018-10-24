import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface ISignInFormData {
  email?: string;
  firstName?: string;
  lastName?: string;
  passwordOne?: string;
  passwordTwo?: string;
}

export type ISignInComponent = FormikProps<ISignInFormData> &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
