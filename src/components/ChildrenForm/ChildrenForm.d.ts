import { IAppState } from 'src/types/state';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IChildrenFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IChildrenFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface IChildrenFormData {
  email?: string;
  passwordOne?: string;
  passwordTwo?: string;
}
export type IChildrenFormComponent = IChildrenFormDispatchToProps &
  IChildrenFormMapStateToProps &
  InjectedIntlProps;
