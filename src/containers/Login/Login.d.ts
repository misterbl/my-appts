import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface ILoginFormData {
    email?: string;
    password?: string;
}

export interface ILoginState {
    wrongAuth: boolean;
    focused: string;
}

export type ILoginComponent = FormikProps<ILoginFormData> &
    InjectedIntlProps &
    RouteComponentProps<any, StaticContext>;
