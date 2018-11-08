import { ActionCreatorsMapObject } from 'redux';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { IAppState } from 'src/types/state';

export interface UserCardDispatchToProps {
  apiActions: ActionCreatorsMapObject;
  apiThunk: ActionCreatorsMapObject;
}

export interface IUserCardState {
  viewedUser: IAppState['api']['userData'];
}
export interface IUserCardMapStateToProps {
  user: IAppState['api']['userData'];
}

export type TUserCard = IUserCardMapStateToProps &
  UserCardDispatchToProps &
  RouteComponentProps<any, StaticContext> &
  InjectedIntlProps;
//
