import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { AppFooter } from '../AppFooter';

import { auth } from '../../../firebase';
import { ROUTES } from '../../../consts';
import IntlMock from '../../../testMocks/intl.mock';
import generateAppState from '../../../testMocks/appState.mock';

// jest.mock('../../../firebase', () => ({
//   auth: {
//     doSignInWithprofileTitleAndprofileDescription: jest
//       .fn()
//       .mockReturnValue(Promise.resolve({})),
//     doFacebookSignIn: jest.fn().mockReturnValue(Promise.resolve({})),
//   },
// }));

describe('AppFooter', () => {
  const props = {
    intl: IntlMock,
    history: historyMock,
    location: historyMock.location,
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
  };
  const wrapper = shallow(<AppFooter {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
