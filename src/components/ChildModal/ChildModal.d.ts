import { IAppState } from '../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';

export interface IChildModalState {
  modalIsOpen: boolean;
  checked: string;
  value: string;
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
