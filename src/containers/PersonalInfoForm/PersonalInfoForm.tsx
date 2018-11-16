import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as Yup from 'yup';

import {
  TPersonalInfoFormComponent,
  IPersonalInfoFormDispatchToProps,
  IPersonalInfoFormMapStateToProps,
  IPersonalInfoFormState,
} from './PersonalInfoForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { IAppState } from '../../types/state';
import { getUserData } from '../../selectors/apiSelectors';
import Svg from '../../components/Svg';
import { AccountIcon, EditIcon } from '../../styles/assets';
import labelColor from '../../utils/labelColor';
import { QUERIES } from '../../consts';
import ErrorMessage from '../../components/ErrorMessage';
import FormikInput from '../../components/FormikInput/FormikInput';
import AboutYouModal from '../../components/AboutYouModal/AboutYouModal';
import { UploadScreen } from '../../components/UploadScreen/UploadScreen';
import autocomplete from '../../utils/autocomplete';

export const PersonalInfoForm = (props: TPersonalInfoFormComponent) => {
  const { values, errors, setFieldValue, submitButton } = props;
  return (
    <Form className="profile-form mh3 flex flex-column">
      <FormikInput
        {...props}
        values={values.firstName}
        errors={errors.firstName}
        name="firstName"
      />
      <FormikInput
        {...props}
        values={values.lastName}
        errors={errors.lastName}
        name="lastName"
      />
      {submitButton}
    </Form>
  );
};
export class PersonalInfo extends React.Component<
  TPersonalInfoFormComponent,
  IPersonalInfoFormState
> {
  constructor(props: TPersonalInfoFormComponent) {
    super(props);
    const { user } = this.props;
    this.state = {
      address: (user && user.address) || '',
      addressError: false,
      avatar: [],
    };
  }

  componentDidMount() {
    autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  onSubmit = (event: any) => {
    const { firstName, lastName } = event;
    const { user } = this.props;
    let address: string | null;
    if (this.state.address === '') {
      address = user && user.address;
    } else {
      address = this.state.address;
    }

    if (this.props.user) {
      const { _id } = this.props.user;
      this.props.apiThunk.updateUser(
        QUERIES({
          _id,
          firstName,
          lastName,
          address,
        }).UPDATE_PERSONAL_INFO,
      );
    }
  };

  handlePlaceSelect = async () => {
    this.setState({ addressError: false });
    const addressObject = await autocomplete.getPlace();
    const address = addressObject.formatted_address;
    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();
    if (this.props.user) {
      const { _id } = this.props.user;

      this.props.apiThunk.updateUser(
        QUERIES({
          _id,
          address,
          lat,
          lng,
        }).UPDATE_LOCATION,
      );
    }
  };

  checkAddressError = (e: any) => {
    this.setState({ address: e.target.value });
    if (e.target.value.length === 0) {
      return this.setState({ addressError: true });
    }
    this.setState({ addressError: false });
  };

  submitFiles = async (file: any) => {
    if (this.props.user) {
      this.props.apiThunk.uploadFile(this.props.user._id, file);
    }
  };

  render() {
    const {
      intl: { formatMessage },
      user,
    } = this.props;

    return (
      <div className="flex flex-column ph5-m ph7-l">
        <div className="flex pv4 mh3 justify-center relative">
          {user && user.avatar ? (
            <img
              className="br-100 h3 w3"
              src={user.avatar || ''}
              alt="user's profile"
            />
          ) : (
            <Svg Icon={AccountIcon} width="4rem" height="4rem" />
          )}
          <Svg
            className="absolute mt4 pr5"
            Icon={EditIcon}
            width="20pt"
            height="20pt"
            fill="black"
          />
          <UploadScreen
            onSubmit={(file: any) => this.submitFiles(file)}
            className="absolute mt4 pr5"
            printcount={1}
            submitDiv={
              <Svg Icon={EditIcon} width="20pt" height="20pt" fill="black" />
            }
          />
        </div>
        {user && (
          <Formik
            initialValues={{
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              address: user.address || '',
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required(
                formatMessage({
                  id: 'content|personalinfoform|firstNamerequired',
                }),
              ),
              lastName: Yup.string().required(
                formatMessage({
                  id: 'content|personalinfoform|lastNamerequired',
                }),
              ),
            })}
            onSubmit={this.onSubmit}
            render={
              /* istanbul ignore next */ formikProps => (
                <PersonalInfoForm {...formikProps} {...this.props} />
              )
            }
          />
        )}
        <form
          onSubmit={(e: any) => e.preventDefault()}
          className="profile-form mh3 flex flex-column"
        >
          <label
            className={`${labelColor(this.state.address)} f6`}
            htmlFor="address"
          >
            <FormattedMessage id="general|placeholder|address" />
          </label>
          <input
            defaultValue={user ? user.address : ''}
            id="autocomplete"
            autoComplete="off"
            name="address"
            className="ma0"
            onChange={e => this.checkAddressError(e)}
            placeholder={formatMessage({
              id: 'general|placeholder|address',
            })}
          />
          {this.state.addressError && (
            <ErrorMessage
              fill="red"
              className="red mb3"
              error={formatMessage({
                id: 'content|personalinfoform|addressrequired',
              })}
            />
          )}
        </form>
        <AboutYouModal
          user={user}
          updateUser={this.props.apiThunk.updateUser}
        />
      </div>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IPersonalInfoFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IPersonalInfoFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlPersonalInfoForm = injectIntl(PersonalInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlPersonalInfoForm);
