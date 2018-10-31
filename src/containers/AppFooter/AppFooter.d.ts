import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IAppFooterState {
  clicked: string | null;
}
export type TAppFooterComponent = InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
