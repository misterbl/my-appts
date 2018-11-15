import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { PasswordReset, PasswordResetForm } from '../PasswordReset';
import { auth } from '../../../firebase';

jest.mock('../../../firebase', () => ({
  auth: {
    doPasswordReset: jest.fn().mockReturnValue(Promise.resolve({})),
  },
}));

describe('PasswordReset', () => {
  const props = {
    values: {
      email: 'emailTest',
    },
    errors: { email: null },
    touched: { email: false },
    ...formikRenderMock,
    initialValues: {
      email: '',
    },
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
  };
  // @ts-ignore
  const wrapper = shallow(<PasswordReset {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Formik element if submitted is false', () => {
    wrapper.setState({
      submitted: false,
    });
    expect(wrapper.find('Formik').length).toBe(1);
  });

  it('should not  render a Formik element if submitted is true', () => {
    wrapper.setState({
      submitted: true,
    });
    expect(wrapper.find('Formik').length).toBe(0);
  });
  it('should call onSubmit on form submit', () => {
    wrapper.setState({
      submitted: false,
    });
    const formik = wrapper.find('Formik');
    formik.simulate('submit', { email: 'email' });
    expect(auth.doPasswordReset).toHaveBeenCalled();
  });

  describe('errors', () => {
    it('show the error message when there is an error and submitted is false', () => {
      const errorProps = {
        ...props,
        errors: { email: 'errorEmail' },
        touched: { email: true },
      };
      // @ts-ignore
      const wrapperWithErrors = shallow(<PasswordResetForm {...errorProps} />);
      const errorMessage = wrapperWithErrors.find('ErrorMessage');
      expect(errorMessage.length).toBe(1);
    });
    it('does not show the error message when there  are none', () => {
      const errorMessage = wrapper.find('ErrorMessage');
      expect(errorMessage.length).toBe(0);
    });
  });
});
