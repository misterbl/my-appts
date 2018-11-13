import { IAppState } from 'src/types/state';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAvailabilityFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAvailabilityState {
  selectedDays: any[];
  selectedDay: any;
}
export interface IAvailabilityFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}
export interface IAvailabilityFormComponent {
  submitButton: HTMLButtonElement;
}
export type TAvailabilityForm = IAvailabilityFormComponent &
  IAvailabilityFormDispatchToProps &
  IAvailabilityFormMapStateToProps &
  InjectedIntlProps;
