import * as React from 'react';
import { shallow } from 'enzyme';
import historyMock from '../../../testMocks/history.mock';
import { DashBoard } from '../DashBoard';
import IntlMock from '../../../testMocks/intl.mock';
import generateAppState from '../../../testMocks/appState.mock';
import { auth } from '../../../firebase';
import { ROUTES } from '../../../consts';

jest.mock('../../../firebase', () => ({
  auth: {
    doSignOut: jest.fn().mockReturnValue(Promise.resolve({})),
  },
}));

describe('AddInfoForm', () => {
  const props = {
    user: generateAppState().api.userData,
    apiThunk: { updateUser: jest.fn() },
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
  // @ts-ignore
  const wrapper = shallow(<DashBoard {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call history.push() on click', () => {
    const div = wrapper.find('div').at(0);
    div.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('id/card');
  });
  it('should call auth.doSignOut() on click', async () => {
    const div = wrapper.find('#signOut');
    await div.simulate('click');
    expect(auth.doSignOut).toHaveBeenCalled();
  });
  it('should call props.history.push on click', async () => {
    const div = wrapper.find('#signOut');
    await div.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith(ROUTES.INDEX);
  });
});
