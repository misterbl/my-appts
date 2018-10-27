import { IAppState } from './../../types/state.d';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';


export interface IAccountMapStateToProps {
  user: IAppState['api']['userData'];
}
export type IAccountComponent = IAccountMapStateToProps & InjectedIntlProps & RouteComponentProps<any, StaticContext>;
