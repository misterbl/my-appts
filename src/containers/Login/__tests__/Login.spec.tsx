import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { Login } from '../Login';

import { auth } from '../../../firebase';

// jest.mock('../../../firebase', () =>
//   jest.fn().mockReturnValue({
//     auth: {
//       doSignInWithEmailAndPassword: jest.fn(),
//       doFacebookSignIn: jest.fn(),
//     },
//   }),
// );

describe('Login', () => {
  const props = {
    values: {
      email: 'emailTest',
      password: 'passwordTest',
    },
    errors: { email: false, password: false },
    ...formikRenderMock,
    initialValues: {
      email: '',
      password: '',
    },
    apiThunk: { getUserData: jest.fn() },
    intl: { formatMessage: jest.fn() },
    history: historyMock,
    location: 'location',
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
    onSubmit: jest.fn(),
    faceBookLogin: jest.fn(),
  };
  // @ts-ignore
  const wrapper = shallow(<Login {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Facebook element', () => {
    expect(wrapper.find('FacebookButton').length).toBe(1);
  });
  it('calls getUserData on Facebook button click', async () => {
    const facebookButton = wrapper.find('FacebookButton');
    await facebookButton.simulate('click');
    expect(props.faceBookLogin()).toHaveBeenCalled();
  });
  it('should render a Formik element', () => {
    expect(wrapper.find('Formik').length).toBe(1);
  });

  it('should call onSubmit on form submit', () => {
    const {
      values: { email, password },
      onSubmit,
    } = props;
    const formik = wrapper.find('Formik');
    formik.simulate('submit', { email, password });
    expect(auth).toHaveBeenCalled();
  });
});
