import { ActionCreatorsMapObject } from 'redux';
import { History } from 'history';
import { RouteComponentProps, StaticContext } from 'react-router';
import { IAppState } from './types/state';
import { InjectedIntlProps } from 'react-intl';

interface IRouteComponentProps {
  userId?: string;
}
export interface IAppComponentDispatchToProps {
  apiActions: ActionCreatorsMapObject;
  apiThunk: ActionCreatorsMapObject;
}

export interface IAppComponentMapStateToProps {
  user: IAppState['api']['userData'];
}

export type TAppComponent = IAppComponentDispatchToProps &
  IAppComponentMapStateToProps &
  RouteComponentProps<any, StaticContext>;
//   InjectedIntlProps &
//
