import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { IAppState } from '../../types/state';

export interface IDashBoardMapStateToProps {
  user: IAppState['api']['userData'];
}

export type TDashBoard = IDashBoardMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
