import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { Register, RegisterForm } from '../Register';

import { auth } from '../../../firebase';
// import * as firebase from 'firebase/app';
import { ROUTES } from '../../../consts';
import IntlMock from '../../../testMocks/intl.mock';
import generateAppState from '../../../testMocks/appState.mock';

jest.mock('../../../firebase', () => ({
  auth: {
    doCreateUserWithEmailAndPassword: jest
      .fn()
      .mockReturnValue(Promise.resolve({})),
    doFacebookSignIn: jest.fn().mockReturnValue(Promise.resolve({})),
  },
}));

describe('Register', () => {
  const props = {
    values: {
      email: 'emailTest',
      password: 'passwordTest',
    },
    // errors: { email: null, password: null },
    // touched: { email: false, password: false },
    ...formikRenderMock,
    initialValues: {
      email: '',
      password: '',
    },
    apiThunk: { getUserData: jest.fn(), postUserData: jest.fn() },
    intl: IntlMock,
    history: historyMock,
    location: historyMock.location,
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
    onSubmit: jest.fn(),
    faceBookRegister: jest.fn(),
  };
  // @ts-ignore
  const wrapper = shallow(<Register {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a Facebook element', () => {
    expect(wrapper.find('FacebookButton').length).toBe(1);
  });
  describe('Facebook button', () => {
    const facebookButton = wrapper.find('FacebookButton');
    it('calls doFacebookSignIn on Facebook button click', async () => {
      await facebookButton.simulate('click');
      expect(auth.doFacebookSignIn).toHaveBeenCalled();
    });
    it('calls getUserData on Facebook button click', async () => {
      await facebookButton.simulate('click');
      expect(props.apiThunk.getUserData).toHaveBeenCalled();
    });
    it('calls history.push on Facebook button click', async () => {
      await facebookButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith(ROUTES.DASHBOARD);
    });
  });

  it('should render a Formik element', () => {
    expect(wrapper.find('Formik').length).toBe(1);
  });

  it('should call doCreateUserWithEmailAndPassword on form submit', () => {
    const {
      values: { email, password },
    } = props;
    const formik = wrapper.find('Formik');
    formik.simulate('submit', { email, password });
    expect(auth.doCreateUserWithEmailAndPassword).toHaveBeenCalled();
  });
  describe('Errors', () => {
    const newProps = {
      ...props,
      userExists: false,
      user: generateAppState().api.userData,
    };
    const registerForm = shallow(<RegisterForm {...newProps} />);
    it('it shows an error message for email when there is an error', () => {
      registerForm.setProps({
        errors: { email: 'emailError' },
        touched: { email: true },
      });
      const errroMessage = registerForm.find('ErrorMessage');
      expect(errroMessage.length).toBe(1);
    });
    it('it shows an error message for password when there is an error', () => {
      registerForm.setProps({
        errors: { password: 'passwordError' },
        touched: { password: true },
      });
      const errroMessage = registerForm.find('ErrorMessage');
      expect(errroMessage.length).toBe(1);
    });
    it('it shows an error message for userExists when there is an error', () => {
      registerForm.setProps({
        errors: {},
        touched: {},
        userExists: true,
      });
      const errroMessage = registerForm.find('ErrorMessage');
      expect(errroMessage.length).toBe(1);
    });
  });
});
