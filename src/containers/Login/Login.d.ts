import { ActionCreatorsMapObject } from 'redux';
import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface ILoginFormData {
    email?: string;
    password?: string;
}

export interface ILoginState {
    wrongAuth: boolean;
}

export interface ILoginStateDispatchToProps {
    apiThunk: ActionCreatorsMapObject;
}
export type ILoginComponent = FormikProps<ILoginFormData> &
    InjectedIntlProps & ILoginStateDispatchToProps &
    RouteComponentProps<any, StaticContext>;
