import * as React from 'react';
import { WarningIcon } from 'src/styles/assets';
import { IErrorMessage } from './ErrorMessage.d';

const ErrorMessage = (props: IErrorMessage) => (
  <span className={`db mt2 flex ${props.className}`} role="alert">
    <WarningIcon fill={props.fill} height="15pt" width="15pt" />
    <span className="ml2">{props.error}</span>
  </span>
);

export default ErrorMessage;
