import { IAppState } from '../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';

export interface IChieldFieldState {
  focused: string;
}

export interface IChieldFieldComponent {
  childrenNumber?: number;
}
export interface IChieldFieldFormData {
  name?: string;
  age?: string;
  dob?: string;
  school?: string;
  information?: string;
}
export type TChieldField = IChieldFieldComponent &
  Pick<FormikProps<IChieldFieldFormData>, 'values' | 'setFieldValue'> &
  InjectedIntlProps;
