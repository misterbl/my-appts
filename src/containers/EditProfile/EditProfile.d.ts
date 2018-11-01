import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';



export interface EditProfileDispatchToProps {
  apiThunk: ActionCreatorsMapObject;
}

export interface EditProfileState {
  selected: string
}
// export interface EditProfileMapStateToProps {
//   user: IAppState['api']['userData'];
// }

export type EditProfileComponent = InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
