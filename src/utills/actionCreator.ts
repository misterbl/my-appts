import { AnyAction } from 'redux';

export const makeActionCreator = (type: string, ...argNames: any[]) => {
  // tslint:disable-line no-any
  return (...args: any[]) => {
    // tslint:disable-line no-any
    const action: AnyAction = { type };
    argNames.forEach((arg: any, index: number) => {
      // tslint:disable-line no-any
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
