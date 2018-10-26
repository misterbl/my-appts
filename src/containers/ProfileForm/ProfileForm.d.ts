import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IProfileFormFormData {
  firstName: string;
  lastName: string;
  address: string;
  profileTitle: string;
  profileText: string;
  children: string;
  availabilities: string;
}

export interface IProfileFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IProfileFormComponent = FormikProps<IProfileFormFormData> &
  IProfileFormDispatchToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;