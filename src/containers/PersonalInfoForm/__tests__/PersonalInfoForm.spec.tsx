import * as React from 'react';
import { shallow } from 'enzyme';
import formikRenderMock from '../../../testMocks/formikRender.mock';
import historyMock from '../../../testMocks/history.mock';
import { PersonalInfoForm, PersonalInfo } from '../PersonalInfoForm';
import generateAppState from '../../../testMocks/appState.mock';
import autocomplete from '../../../utils/autocomplete';

jest.mock('../../../utils/autocomplete', () => ({
  default: {
    addListener: jest.fn(),
    getPlace: jest.fn().mockReturnValue({
      formatted_address: 'formatted_address',
      geometry: { location: { lat: jest.fn(), lng: jest.fn() } },
    }),
  },
}));

describe('PersonalInfoForm', () => {
  const props = {
    values: {
      firstName: 'firstNameTest',
      lastName: 'lastNameTest',
      address: 'addressTest',
    },
    errors: { firstName: null, lastName: null, address: null },
    ...formikRenderMock,
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
    },
    user: generateAppState().api.userData,
    intl: { formatMessage: jest.fn() },
    history: historyMock,
    location: 'location',
    match: {
      params: {},
      isExact: true,
      path: '',
      url: '',
    },
    apiThunk: { updateUser: jest.fn(), uploadFile: jest.fn() },
  };
  // @ts-ignore
  const wrapper = shallow(<PersonalInfo {...props} />);
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Formik element', () => {
    expect(wrapper.find('Formik').length).toBe(1);
  });
  it('should call updateUser on form submit', () => {
    wrapper.setState({
      submitted: false,
    });
    const formik = wrapper.find('Formik');
    formik.simulate('submit', {
      firstName: 'firstNameTest',
      lastName: 'lastNameTest',
      address: 'addressTest',
    });
    expect(props.apiThunk.updateUser).toHaveBeenCalled();
  });
  describe('componentDidMount', () => {
    it('calls autocomplete.addListener', () => {
      // @ts-ignore
      wrapper.instance().componentDidMount();
      expect(autocomplete.addListener).toHaveBeenCalled();
    });
  });
  describe('handlePlaceSelect', () => {
    it('calla autocomplete.getPlace()', () => {
      // @ts-ignore
      wrapper.instance().handlePlaceSelect();
      expect(autocomplete.getPlace).toHaveBeenCalled();
    });
    it('calls updateUser', () => {
      // @ts-ignore
      wrapper.instance().handlePlaceSelect();
      expect(props.apiThunk.updateUser).toHaveBeenCalled();
    });
  });
  describe('UploadScreen', () => {
    it('calls apiThunk.uploadFile on submit', () => {
      const uploadScreen = wrapper.find('UploadScreen');
      uploadScreen.simulate('submit');
      expect(props.apiThunk.uploadFile).toHaveBeenCalled();
    });
  });
});
