import * as React from 'react';
import { Formik, Form } from 'formik';
// import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IProfileFormComponent } from './ProfileForm.d';
// import ROUTES from '../../consts/routes';

export class ProfileForm extends React.Component<IProfileFormComponent> {
  onSubmit = (event: any) => {
    // const { firstName, lastName, address, profileTitle, profileText, children, availabilities } = event;
    // auth
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    // //   .then(authUser => {
    // //     this.props.history.push(ROUTES.DASHBOARD);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };


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
            profileText: '',
            children: '',
            availabilities: '',

          }}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="signin-register flex flex-column">
              <label htmlFor="firstName" />
              <input
                value={values.firstName}
                name="firstName"
                onChange={event => setFieldValue('firstName', event.target.value)}
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|firstName',
                })}
              />
              <label htmlFor="lastName" />
              <input
                value={values.lastName}
                name="lastName"
                onChange={event =>
                  setFieldValue('lastName', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|password',
                })}
              />
              <label htmlFor="address" />
              <input
                value={values.address}
                name="address"
                onChange={event =>
                  setFieldValue('address', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|address',
                })}
              />
              <input
                value={values.profileTitle}
                name="profileTitle"
                onChange={event =>
                  setFieldValue('profileTitle', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|profileTitle',
                })}
              />
              <input
                value={values.profileText}
                name="profileText"
                onChange={event =>
                  setFieldValue('profileText', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|profileText',
                })}
              />
              <input
                value={values.children}
                name="children"
                onChange={event =>
                  setFieldValue('children', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|children',
                })}
              />
              <input
                value={values.availabilities}
                name="availabilities"
                onChange={event =>
                  setFieldValue('availabilities', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|availabilities',
                })}
              />
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
