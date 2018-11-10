import { InjectedIntlProps } from 'react-intl';
import { FormikProps } from 'formik';

export interface IWeekDaysFormState {
  isElementOpen: boolean;
  selection: any;
}

export interface IWeekDaysFormFormData {
  category: {
    name: string;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };
}
export interface IWeekDaysFormComponent {
  category: string;
}
export interface IWeekDaysFormFormData {
  name?: string;
}

export type TWeekDaysForm = IWeekDaysFormComponent &
  InjectedIntlProps &
  Pick<FormikProps<IWeekDaysFormFormData>, 'values' | 'setFieldValue'>;
