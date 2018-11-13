import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { PasswordReset } from '../PasswordReset';
import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { auth } from '../../../firebase';

jest.mock('../../../firebase/');

describe('PasswordReset', () => {
  const props = {
    values: {
      email: 'emailTest',
    },
    errors: { email: false },
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
  xit('should call onSubmit on form submit', () => {
    (auth.doPasswordReset as jest.Mock).mockReturnValueOnce('');
    const {
      values: { email },
      onSubmit,
    } = props;
    const formik = wrapper.find('Formik');
    formik.simulate('submit', { email: '' });
    expect(auth.doPasswordReset).toHaveBeenCalled();
  });

  describe('errors', () => {
    xit('show the error message when there is an error and submitted is false', () => {
      const errorProps = {
        ...props,
        errors: { email: true },
        touched: { email: true },
      };
      // @ts-ignore
      const wrapperWithErrors = shallow(<PasswordReset {...errorProps} />);
      wrapperWithErrors.setState({
        submitted: false,
      });

      const errorMessage = wrapperWithErrors.find('ErrorMessage');
      const formik = wrapperWithErrors.find('Formik');
      formik.simulate('submit', { email: 'email' });
      expect(errorMessage.length).toBe(1);
    });
    it('does not show the error message when there  are none', () => {
      const errorMessage = wrapper.find('.green-error');
      const formik = wrapper.find('Formik');
      // formik.simulate('submit', { email: 'email' });
      expect(errorMessage.length).toBe(0);
    });
  });
});
