import { IAppState } from 'src/types/state';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAvailabilityFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAvailabilityFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IAvailabilityFormComponent = IAvailabilityFormDispatchToProps &
  IAvailabilityFormMapStateToProps &
  InjectedIntlProps;
