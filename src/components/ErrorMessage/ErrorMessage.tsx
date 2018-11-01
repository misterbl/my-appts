import * as React from 'react';
import { WarningIcon } from 'src/styles/assets';

// @ts-ignore
const ErrorMessage = ({ error, className }): IErrorMessage => {
  console.log(className);

  return (
    <span className={`db green-error mt2 flex ${className}`} role="alert">
      <WarningIcon fill="#cce281" height="15pt" width="15pt" />
      <span className="ml2">{error}</span>
    </span>
  );
};
export default ErrorMessage;
