import { IAppState } from 'src/types/state';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAvailabilitiesFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAvailabilitiesFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IAvailabilitiesFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}
export type IAvailabilitiesFormComponent = IAvailabilitiesFormDispatchToProps &
  IAvailabilitiesFormMapStateToProps &
  InjectedIntlProps;
