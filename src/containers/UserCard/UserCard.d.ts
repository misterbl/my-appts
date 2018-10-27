import { ActionCreatorsMapObject } from 'redux';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';

export interface UserCardDispatchToProps {
  apiActions: ActionCreatorsMapObject;
  apiThunk: ActionCreatorsMapObject;
}

// export interface UserCardMapStateToProps {
//   user: IAppState['api']['userData'];
// }

export type TUserCard = UserCardDispatchToProps & RouteComponentProps<any, StaticContext> & InjectedIntlProps
//
