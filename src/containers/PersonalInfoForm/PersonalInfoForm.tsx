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
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';
import Svg from 'src/components/Svg';
import { AccountIcon } from 'src/styles/assets';
import labelColor from '../../utils/labelColor';
import { QUERIES } from 'src/consts';
import ErrorMessage from 'src/components/ErrorMessage';
import FormikInput from 'src/components/FormikInput/FormikInput';
// import { UploadScreen } from 'src/components/UploadScreen/UploadScreen';

export class PersonalInfoForm extends React.Component<
  TPersonalInfoFormComponent,
  IPersonalInfoFormState
> {
  autocomplete: any;
  constructor(props: TPersonalInfoFormComponent) {
    super(props);
    const { user } = this.props;
    this.state = {
      currentUser: user,
      // @ts-ignore
      address: '',
      addressError: false,
      filesToBeSent: [],
      avatar: [],
    };
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      // @ts-ignore
      document.getElementById('autocomplete'),
      {},
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
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
    // @ts-ignore
    const { _id, avatar } = this.props.user;
    this.props.apiThunk.updateUser(
      QUERIES({
        _id,
        firstName,
        lastName,
        avatar,
        address,
      }).UPDATE_PERSONAL_INFO,
    );
  };

  handlePlaceSelect = async () => {
    this.setState({ addressError: false });
    const addressObject = await this.autocomplete.getPlace();
    this.setState({ address: addressObject.formatted_address });
  };

  checkAddressError = (e: any) => {
    if (e.target.value.length === 0) {
      return this.setState({ addressError: true });
    }
    this.setState({ addressError: false });
  };
  // handleClick = async () => {
  //   const reader = new FileReader();
  //   await reader.addEventListener(
  //     'load',
  //     () => {
  //       this.setState({ avatar: reader.result });
  //     },
  //     false,
  //   );
  // if(this.state.filesToBeSent.length > 0){
  // reader.readAsDataURL(this.state.filesToBeSent[0]);}
  // @ts-ignore
  //   console.log(this.state);
  // };

  // submitFiles = async () => {
  //   console.log(3);

  //   console.log(this.state.avatar[0]);
  //   console.log(4);

  //   const avatar = this.state.filesToBeSent;
  //   const {
  //     // @ts-ignore
  //     _id,
  //     // @ts-ignore
  //     firstName,
  //     // @ts-ignore
  //     lastName,
  //     // @ts-ignore
  //     address,
  //     // @ts-ignore
  //     postCode,
  //     // @ts-ignore
  //     city,
  //   } = this.props.user;

  //   this.props.apiThunk.updateUser(
  //     QUERIES({ _id, avatar, firstName, lastName, address, postCode, city })
  //       .UPDATE_PERSONAL_INFO,
  //   );
  // };

  render() {
    const {
      intl: { formatMessage },
      user,
    } = this.props;

    return (
      <div className="flex flex-column ph7-ns">
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
          {/* <Svg
            className="absolute mt4 pr5"
            Icon={EditIcon}
            width="20pt"
            height="20pt"
            fill="black"
          /> */}
          {/* <UploadScreen
            fileRead={this.state.avatar}
            submitFiles={this.submitFiles}
            filesToBeSent={this.state.filesToBeSent}
            className="absolute mt4 pr5"
            printcount={1}
            submitDiv={
              <Svg
                handleClick={() => this.handleClick()}
                Icon={EditIcon}
                width="20pt"
                height="20pt"
                fill="black"
              />
            }
          /> */}
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
          >
            {formikProps => (
              <Form className="profile-form mh3 flex flex-column">
                <FormikInput
                  {...formikProps}
                  values={formikProps.values.firstName}
                  errors={formikProps.errors.firstName}
                  setFieldValue={formikProps.setFieldValue}
                  name="firstName"
                />
                <FormikInput
                  {...formikProps}
                  values={formikProps.values.lastName}
                  errors={formikProps.errors.lastName}
                  setFieldValue={formikProps.setFieldValue}
                  name="lastName"
                />
                {this.props.submitButton}
              </Form>
            )}
          </Formik>
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

const injectIntlPersonalInfoForm = injectIntl(PersonalInfoForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlPersonalInfoForm);
