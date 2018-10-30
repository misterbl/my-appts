import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface IPasswordReseformData {
    email?: string;
}

export interface IPasswordReseState {
    submitted: boolean
    focused: string
}
export type IPasswordResetComponent = FormikProps<IPasswordReseformData> &
    InjectedIntlProps &
    RouteComponentProps<any, StaticContext>;
