import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IDashBoardFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}

export type IDashBoardComponent = FormikProps<IDashBoardFormData> &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
