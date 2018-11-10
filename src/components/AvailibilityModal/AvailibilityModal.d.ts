import { IAppState } from '../../types/state.d';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAvailibilityModalState {
  modalIsOpen: boolean;
}

export interface IAvailibilityModalComponent {
  user: IAppState['api']['userData'];
  apiThunk: ActionCreatorsMapObject;
}

// export interface IAvailibilityModalDispatchToProps {
//   apiThunk: ActionCreatorsMapObject;
// }

export type TAvailibilityModal = IAvailibilityModalComponent &
  // IAvailibilityModalDispatchToProps &
  InjectedIntlProps;
