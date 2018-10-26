import { IAppState } from 'src/types/state';
import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAddInfoFormFormData {
  firstName: string;
  lastName: string;
  address: string;
  profileTitle: string;
  profileText: string;
  children: string;
  availabilities: string;
}

export interface IAddInfoFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAddInfoFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IAddInfoFormComponent = FormikProps<IAddInfoFormFormData> &
  IAddInfoFormDispatchToProps & IAddInfoFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
