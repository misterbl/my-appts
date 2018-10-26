import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  address: string;
}

export interface IProfileFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IPersonalInfoFormComponent = FormikProps<IPersonalInfoFormData> &
  IProfileFormDispatchToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
