import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IProfileFormFormData {
  firstName: string,
  lastName: string,
  address: string,
  profileTitle: string,
  profileText: string,
  children: string,
  availabilities: string,
}

export type IProfileFormComponent = FormikProps<IProfileFormFormData> & InjectedIntlProps & RouteComponentProps<any, StaticContext>;
