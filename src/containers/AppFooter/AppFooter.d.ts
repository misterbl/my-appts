import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export type IAppFooterComponent = InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
