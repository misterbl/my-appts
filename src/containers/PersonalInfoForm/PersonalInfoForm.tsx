import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  IPersonalInfoFormComponent,
  IProfileFormDispatchToProps,
  IProfileFormMapStateToProps,
} from './PersonalInfoForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';

import ROUTES from '../../consts/routes';

export class PersonalInfoForm extends React.Component<
  IPersonalInfoFormComponent
  > {
  onSubmit = (event: any) => {
    const { firstName, lastName, address } = event;
    // @ts-ignore
    const { _id } = this.props.user
    const query = `mutation {
      updateUser (_id: "${_id}" firstName: "${firstName}", lastName: "${lastName}", address: "${address}") {
        _id
        firstName
        lastName
        avatar
        address
        profileTitle
        profileDescription
      }
    }`;
    this.props.apiThunk.updateUser(query);
    this.props.history.push(ROUTES.AD_DETAILS)
  };

  labelColor = (input: string) => (input.length === 0 ? 'white' : 'moon-gray');

  render() {
    const { user, intl: { formatMessage } } = this.props;

    return (
      <div className="flex flex-column">
        <div className="flex pt4 ml4">
          <img
            className="br-100 h3 w3"
            src={user ? user.avatar : ''}
            alt="user's profile"
          />
          <strong className="self-center ml3">Personnal Details</strong>
        </div>
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>
        <Formik
          initialValues={{
            firstName: user && user.firstName,
            lastName: user && user.lastName,
            address: user && user.address,
          }}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="profile-form mh4 flex flex-column">
              <label
                className={`${this.labelColor(values.firstName)} f6`}
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
                className={`${this.labelColor(values.lastName)} f6`}
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
                className={`${this.labelColor(values.address)} f6`}
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


export const mapStateToProps = (state: IAppState): IProfileFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IProfileFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlPersonalInfoForm = injectIntl(PersonalInfoForm);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlPersonalInfoForm),
);
