import { IAppState, Child } from '../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';
import { Moment } from 'moment';

export interface IChildModalState {
  id: string;
  modalIsOpen: boolean;
  checked: string;
  selectedSchool: string;
  schools: any;
  dob: Moment;
}

export interface IChildModalDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IChildModalComponent {
  childrenNumber?: number;
  user: IAppState['api']['userData'];
  child?: Child;
  updating?: boolean;
}
export interface IChildModalFormData {
  name?: string;
}
// export type TChildModal = IChildModalComponent &
//   Pick<FormikProps<IChildModalFormData>, 'values' | 'setFieldValue'> &
//   InjectedIntlProps;
export type TChildModal = IChildModalComponent &
  IChildModalDispatchToProps &
  IChildModalComponent &
  InjectedIntlProps;
