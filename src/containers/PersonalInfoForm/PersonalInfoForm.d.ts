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

export interface IProfileFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IProfileFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export type IPersonalInfoFormComponent = FormikProps<IPersonalInfoFormData> &
  IProfileFormDispatchToProps & IProfileFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
