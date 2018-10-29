import { IAppState } from 'src/types/state';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IChildrenFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IChildrenFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IChildrenFormState {
  childrenNumber: number;
  formElement: JSX.Element[];
}

export interface IChildrenFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}
export type IChildrenFormComponent = IChildrenFormState &
  IChildrenFormDispatchToProps &
  IChildrenFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
