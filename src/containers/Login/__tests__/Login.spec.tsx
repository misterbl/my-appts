import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { Login } from '../Login';

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
    intl: { formatMessage: jest.fn() },
    history: historyMock,
    location: 'location',
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
    ...formikRenderMock,
  };
  // @ts-ignore
  const wrapper = shallow(<Login {...props} />);
  it('should render a Facebook element', () => {
    expect(wrapper.find('Fcebook').length).toBe(1);
  });
  it('should render a Formik element', () => {
    expect(wrapper.find('Formik').length).toBe(1);
  });
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('errors', () => {
    it('show the error message when there is an error', () => {
      const errorProps = { ...props, errors: { email: true, password: true } };
      // @ts-ignore
      const wrapperWithErrors = shallow(<Login {...errorProps} />);
      const errorMessage = wrapper.find('.green-error');
      const formik = wrapperWithErrors.find('Formik');
      formik.simulate('submit');
      expect(errorMessage.length).toBe(2);
    });
    it('does not show the error message when there  are none', () => {
      const errorMessage = wrapper.find('.green-error');
      const formik = wrapper.find('Formik');
      formik.simulate('submit');
      expect(errorMessage.length).toBe(0);
    });

    // it('Make sure the team name error is shown if it has been touched', () => {
    //     const shallowLogin = shallow(
    //         <Login
    //             {...formikRenderMock}
    //             values={{ teamName: 'teamName' }}
    //             initialValues={{ teamName: '' }}
    //             errors={{ teamName: 'error on teamname' }}
    //             // @ts-ignore
    //             touched={{ teamName: true }}
    //             isError={false}
    //         />,
    //     );
    //     expect(shallowLogin.find('.jg-form-error-copy').text()).toBe(
    //         'error on teamname',
    //     );
    // });
  });
});
