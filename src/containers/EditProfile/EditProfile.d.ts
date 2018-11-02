import { FormikProps } from 'formik';
import { RouteComponentProps, StaticContext } from 'react-router';
import { InjectedIntlProps } from 'react-intl';
import { ActionCreatorsMapObject } from 'redux';
import { RefObject } from 'react';

export interface EditProfileState {
  selected: string;
}

export type TEditProfile = InjectedIntlProps &
  RouteComponentProps<any, StaticContext>;
