import { InjectedIntlProps } from 'react-intl';
import { FormikProps } from 'formik';

export interface IFormikInputComponent {
  values?: string;
  name: string;
  errors?: any;
}

export type TFormikInput = FormikProps<any> &
  IFormikInputComponent &
  InjectedIntlProps;
