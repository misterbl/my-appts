import { IAppState } from '../../types/state';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';

export interface IAddInfoFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAddInfoFormData {
  profileTitle?: string;
  profileDescription?: string;
}

export interface IAddInfoFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IAddInfoFormComponent {
  submitButton: HTMLButtonElement;
}

export type TAddInfoForm = FormikProps<IAddInfoFormData> &
  IAddInfoFormComponent &
  IAddInfoFormDispatchToProps &
  IAddInfoFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
