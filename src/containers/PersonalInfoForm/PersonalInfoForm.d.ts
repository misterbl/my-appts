import { IAppState } from 'src/types/state';
import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IPersonalInfoFormData {
  firstName: string;
  lastName: string;
  address: string;
}

export interface IPersonalInfoFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IPersonalInfoFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export type IPersonalInfoFormComponent = FormikProps<IPersonalInfoFormData> &
  IPersonalInfoFormDispatchToProps & IPersonalInfoFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
