import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAddInfoFormFormData {
  firstName: string;
  lastName: string;
  address: string;
  profileTitle: string;
  profileText: string;
  children: string;
  availabilities: string;
}

export interface IAddInfoFormsDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IAddInfoFormComponent = FormikProps<IAddInfoFormFormData> &
  IAddInfoFormsDispatchToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
