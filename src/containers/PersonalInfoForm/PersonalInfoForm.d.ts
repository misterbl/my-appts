import { IAppState } from 'src/types/state';
import { FormikProps } from 'formik';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  address: string | null;
}

export interface IPersonalInfoFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IPersonalInfoFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IPersonalInfoFormState {
  currentUser: IAppState['api']['userData'];
  filesToBeSent: [];
  avatar: any;
  address: string;
  addressError: boolean;
}

export interface IPersonalInfoFormComponent {
  submitButton: HTMLButtonElement;
}

export type TPersonalInfoFormComponent = IPersonalInfoFormComponent &
  FormikProps<IPersonalInfoFormData> &
  IPersonalInfoFormDispatchToProps &
  IPersonalInfoFormMapStateToProps &
  InjectedIntlProps;
