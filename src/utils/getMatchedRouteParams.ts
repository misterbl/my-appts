import routes from '../consts/routes';
import { IRouteComponentProps } from '../App.d';
import { matchPath } from 'react-router';
// @ts-ignore
const getMatchedRouteParams = (pathname): IRouteComponentProps => {
  return Object.keys(routes).reduce((carry, id) => {
    const matchedRoute = matchPath<IRouteComponentProps>(pathname, {
      path: routes[id],
      exact: true,
      strict: false,
    });
    if (matchedRoute) {
      return matchedRoute.params;
    }
    return carry;
  }, {});
};

export default getMatchedRouteParams;
