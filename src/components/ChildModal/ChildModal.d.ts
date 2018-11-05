import { IAppState } from '../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';
import { Moment } from 'moment';

export interface IChildModalState {
  modalIsOpen: boolean;
  checked: string;
  selectedSchool: string;
  schools: any;
  dob: Moment;
}

export interface IChildModalComponent {
  childrenNumber?: number;
}
export interface IChildModalFormData {
  name?: string;
}
// export type TChildModal = IChildModalComponent &
//   Pick<FormikProps<IChildModalFormData>, 'values' | 'setFieldValue'> &
//   InjectedIntlProps;
export type TChildModal = IChildModalComponent &
  IChildModalComponent &
  Pick<FormikProps<IChildModalFormData>, 'values' | 'setFieldValue'> &
  InjectedIntlProps;
