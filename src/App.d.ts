import { ActionCreatorsMapObject } from 'redux';
import { History } from 'history';
import { RouteComponentProps, StaticContext } from 'react-router';
import { IAppState } from './types/state';
import { InjectedIntlProps } from 'react-intl';

export interface IAppComponentDispatchToProps {
  apiActions: ActionCreatorsMapObject;
  apiThunk: ActionCreatorsMapObject;
}

export interface IAppComponentMapStateToProps {
  user: IAppState['api']['userData'];
}

export type IAppComponent = IAppComponentDispatchToProps &
  IAppComponentMapStateToProps &
  RouteComponentProps<any, StaticContext>;
//   InjectedIntlProps &
//
