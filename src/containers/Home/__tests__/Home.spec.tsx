import * as React from 'react';
import { shallow } from 'enzyme';
import historyMock from '../../../testMocks/history.mock';
import { Home } from '../Home';
import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { ROUTES } from '../../../consts';

configure({ adapter: new Adapter() });

describe('Home', () => {
  const props = {
    history: historyMock,
    location: historyMock.location,
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
    pushToSignIn: jest.fn(),
    pushToRegister: jest.fn(),
  };

  const wrapper = shallow(<Home {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call pushToSignIn on button click', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(props.history.push).toHaveBeenCalledWith(ROUTES.SIGN_IN);
  });
  it('should call pushToRegister on button click', () => {
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(props.history.push).toHaveBeenCalledWith(ROUTES.REGISTER);
  });
});
