import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  IPersonalInfoFormComponent,
  IPersonalInfoFormDispatchToProps,
  IPersonalInfoFormMapStateToProps,
} from './PersonalInfoForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';

import { ROUTES, QUERIES } from '../../consts';
import Svg from 'src/components/Svg';
import { AccountIcon } from 'src/styles/assets';
import labelColor from '../../utils/labelColor';

export class PersonalInfoForm extends React.Component<
  IPersonalInfoFormComponent
  > {
  onSubmit = (event: any) => {
    const { firstName, lastName, address, postCode, city } = event;
    // @ts-ignore
    const { _id } = this.props.user;
    this.props.apiThunk.updateUser(
      QUERIES({ _id, firstName, lastName, address, postCode, city })
        .UPDATE_PERSONAL_INFO,
    );
    this.props.history.push(ROUTES.AD_DETAILS);
  };

  render() {
    const {
      user,
      intl: { formatMessage },
    } = this.props;

    return (
      <div className="flex flex-column">
        <div className="flex pt4 ml4">
          {user && user.avatar ? (
            <img
              className="br-100 h3 w3"
              src={user.avatar || ''}
              alt="user's profile"
            />
          ) : (
              <Svg Icon={AccountIcon} width="4rem" height="4rem" />
            )}
          <strong className="self-center ttc ml3"><FormattedMessage id='content|editprofile|myinfo' /></strong>
        </div>
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>
        <Formik
          initialValues={{
            firstName: user ? user.firstName : '',
            lastName: user ? user.lastName : '',
            address: user ? user.address : '',
            postCode: user ? user.postCode : '',
            city: user ? user.city : '',
          }}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="profile-form mh4 flex flex-column">
              <label
                className={`${labelColor(values.firstName)} f6`}
                htmlFor="firstName"
              >
                <FormattedMessage id="general|placeholder|firstName" />
              </label>
              <input
                value={values.firstName}
                name="firstName"
                onFocus={() => this.setState({ focused: 'firstName' })}
                onChange={event =>
                  setFieldValue('firstName', event.target.value)
                }
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|firstName',
                })}
              />
              <label
                className={`${labelColor(values.lastName)} f6`}
                htmlFor="lastName"
              >
                <FormattedMessage id="general|placeholder|lastName" />
              </label>
              <input
                value={values.lastName}
                name="lastName"
                onFocus={() => this.setState({ focused: 'lastName' })}
                onChange={event =>
                  setFieldValue('lastName', event.target.value)
                }
                placeholder={formatMessage({
                  id: 'general|placeholder|lastName',
                })}
              />
              <label
                className={`${labelColor(values.address)} f6`}
                htmlFor="address"
              >
                <FormattedMessage id="general|placeholder|address" />
              </label>
              <input
                value={values.address}
                name="address"
                onFocus={() => this.setState({ focused: 'address' })}
                onChange={event => setFieldValue('address', event.target.value)}
                placeholder={formatMessage({
                  id: 'general|placeholder|address',
                })}
              />
              <label
                className={`${labelColor(values.postCode)} f6`}
                htmlFor="postCode"
              >
                <FormattedMessage id="general|placeholder|postCode" />
              </label>
              <input
                value={values.postCode}
                name="postCode"
                onFocus={() => this.setState({ focused: 'postCode' })}
                onChange={event =>
                  setFieldValue('postCode', event.target.value)
                }
                placeholder={formatMessage({
                  id: 'general|placeholder|postCode',
                })}
              />
              <label className={`${labelColor(values.city)} f6`} htmlFor="city">
                <FormattedMessage id="general|placeholder|city" />
              </label>
              <input
                value={values.city}
                name="city"
                onFocus={() => this.setState({ focused: 'city' })}
                onChange={event => setFieldValue('city', event.target.value)}
                placeholder={formatMessage({
                  id: 'general|placeholder|city',
                })}
              />
              <button
                className="bg-green white fw7 ph3 ttc di pv3 bn-ns"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|save" />
              </button>
              {/* {error && <p>{error.message}</p>} */}
            </Form>
          )}
        </Formik>
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlPersonalInfoForm),
);
