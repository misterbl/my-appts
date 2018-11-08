import { IAppState, Child } from '../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject, ActionCreator } from 'redux';
import { FormikProps } from 'formik';
import { Moment } from 'moment';

export interface IAboutYouModalState {
  modalIsOpen: boolean;
}

// export interface IAboutYouModalDispatchToProps {
//   apiThunk: ActionCreatorsMapObject;
// }

export interface IAboutYouModalComponent {
  childrenNumber?: number;
  user: IAppState['api']['userData'];
  child?: Child;
  updating?: boolean;
  updateUser: ActionCreator<any>;
}
export interface IAboutYouModalFormData {
  name?: string;
}
// export type TAboutYouModal = IAboutYouModalComponent &
//   Pick<FormikProps<IAboutYouModalFormData>, 'values' | 'setFieldValue'> &
//   InjectedIntlProps;
export type TAboutYouModal = IAboutYouModalComponent & InjectedIntlProps;
