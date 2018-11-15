import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { AddInfo } from '../AddInfoForm';
import IntlMock from '../../../testMocks/intl.mock';
import generateAppState from '../../../testMocks/appState.mock';

describe('AddInfoForm', () => {
  const props = {
    values: {
      profileTitle: 'profileTitleTest',
      profileDescription: 'profileDescriptionTest',
    },
    ...formikRenderMock,
    initialValues: {
      profileTitle: '',
      profileDescription: '',
    },
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
    onSubmit: jest.fn(),
    faceBookAddInfoForm: jest.fn(),
  };
  // @ts-ignore
  const wrapper = shallow(<AddInfo {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Formik element', () => {
    expect(wrapper.find('Formik').length).toBe(1);
  });

  it('should call updateUser on form submit', () => {
    const {
      values: { profileTitle, profileDescription },
      apiThunk: { updateUser },
    } = props;
    const formik = wrapper.find('Formik');
    formik.simulate('submit', { profileTitle, profileDescription });
    expect(updateUser).toHaveBeenCalled();
  });
  //   describe('Errors', () => {
  //     // @ts-ignore
  //     const addInfoFormForm = shallow(<AddInfoForm {...props} />);
  //     it('it shows an error message for profileTitle when there is an error', () => {
  //       addInfoFormForm.setProps({
  //         errors: { profileTitle: 'profileTitleError' },
  //         touched: { profileTitle: true },
  //       });
  //       const errroMessage = addInfoFormForm.find('ErrorMessage');
  //       expect(errroMessage.length).toBe(1);
  //     });
  //     it('it shows an error message for profileDescription when there is an error', () => {
  //       addInfoFormForm.setProps({
  //         errors: { profileDescription: 'profileDescriptionError' },
  //         touched: { profileDescription: true },
  //       });
  //       const errroMessage = addInfoFormForm.find('ErrorMessage');
  //       expect(errroMessage.length).toBe(1);
  //     });
  //   });
});
