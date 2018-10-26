import * as React from 'react';
import { Formik, Form } from 'formik';
// import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IProfileFormComponent } from './ProfileForm.d';
// import ROUTES from '../../consts/routes';

export class ProfileForm extends React.Component<IProfileFormComponent> {
  onSubmit = (event: any) => {
    // const { firstName, lastName, address, profileTitle, profileDescription, children, availabilities } = event;
    // auth
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    // //   .then(authUser => {
    // //     this.props.history.push(ROUTES.DASHBOARD);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  labelColor = (input: string) => (input.length === 0 ? 'white' : 'moon-gray');

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column vh-100">
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            address: '',
            profileTitle: '',
            profileDescription: '',
            children: '',
            availabilities: '',
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
              <label
                className={`${this.labelColor(values.profileTitle)} f6`}
                htmlFor="profileTitle"
              >
                <FormattedMessage id="general|placeholder|profileTitle" />
              </label>
              <input
                value={values.profileTitle}
                name="profileTitle"
                onFocus={() => this.setState({ focused: 'profileTitle' })}
                onChange={event =>
                  setFieldValue('profileTitle', event.target.value)
                }
                placeholder={formatMessage({
                  id: 'general|placeholder|profileTitle',
                })}
              />
              <label
                className={`${this.labelColor(values.profileDescription)} f6`}
                htmlFor="profileDescription"
              >
                <FormattedMessage id="general|placeholder|profileDescription" />
              </label>
              <input
                value={values.profileDescription}
                name="profileDescription"
                onFocus={() => this.setState({ focused: 'profileDescription' })}
                onChange={event =>
                  setFieldValue('profileDescription', event.target.value)
                }
                placeholder={formatMessage({
                  id: 'general|placeholder|profileDescription',
                })}
              />
              {/* <label
                className={`${this.labelColor(
                  values.children
                )} f6`}
                htmlFor="children"
              >
                <FormattedMessage id="general|placeholder|children" />
              </label>{' '} */}
              {/* <input
                value={values.children}
                name="children"
                  onFocus={() => this.setState({ focused: 'children' })}
                
                onChange={event =>
                  setFieldValue('children', event.target.value)
                }
  
                placeholder={formatMessage({
                  id: 'general|placeholder|children',
                })}
              />
                 <label
                className={`${this.labelColor(
                  values.availabilities
                )} f6`}
                htmlFor="availabilities"
              >
                <FormattedMessage id="general|placeholder|availabilities" />
              </label>
              <input
                value={values.availabilities}
                name="availabilities"
                  onFocus={() => this.setState({ focused: 'availabilities' })}
                
                onChange={event =>
                  setFieldValue('availabilities', event.target.value)
                }
  
                placeholder={formatMessage({
                  id: 'general|placeholder|availabilities',
                })}
              /> */}
              <button
                className="bg-green white fw7 ph3 ttc di pv3 bn-ns"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|next" />
              </button>
              {/* {error && <p>{error.message}</p>} */}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const injectIntlProfileForm = injectIntl(ProfileForm);
export default withRouter(injectIntlProfileForm);
