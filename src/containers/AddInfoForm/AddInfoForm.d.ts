import { IAppState } from 'src/types/state';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';

export interface IAddInfoFormMapStateToProps {
  user: IAppState['api']['userData'];
}

export interface IAddInfoFormDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export type IAddInfoFormComponent = IAddInfoFormDispatchToProps &
  IAddInfoFormMapStateToProps &
  InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
