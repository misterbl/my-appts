import * as React from 'react';
import { Formik, Form } from 'formik';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IPasswordResetComponent, IPasswordReseState } from './PasswordReset.d';
import ROUTES from '../../consts/routes';
import labelColor from '../../utils/labelColor';

class PasswordReset extends React.Component<IPasswordResetComponent, IPasswordReseState> {
  constructor(props: IPasswordResetComponent) {
    super(props);
    this.state = {
      submitted: false,
      focused: '',
    }
  }

  onSubmit = (event: any) => {
    const { email } = event;
    auth.doPasswordReset(email).then(() => {
      this.setState({ submitted: true })
    }).catch(function (error) {
      // An error happened.
    });

  };

  render() {
    const { formatMessage } = this.props.intl;
    const { submitted } = this.state
    console.log(this);

    return (
      <div className="vh-100 bg-light-blue ">
        <div className="absolute bottom-2 ph3">
          {!submitted && <><p className="tc pb2 white">
            <FormattedMessage id="content|passwordreset|directives" />
          </p>
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={this.onSubmit}
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form autoComplete="off" className="flex flex-column white-input ">
                  <label
                    className={`${labelColor(values.email, 'white', 'o-0')} f6`}
                    htmlFor="email"
                  >
                    <FormattedMessage id="general|placeholder|email" />
                  </label>
                  <input
                    autoComplete="new-email"
                    value={values.email}
                    name="email"
                    onFocus={() => this.setState({ focused: 'email' })}
                    onChange={event => setFieldValue('email', event.target.value)}
                    type="text"
                    placeholder={formatMessage({
                      id: 'general|placeholder|email',
                    })}
                  />
                  <button
                    className="bg-green white fw7 ph3 ttc di pv3 bn shadow-5"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <FormattedMessage id="general|button|next" />
                  </button>

                  {/* {error && <p>{error.message}</p>} */}
                </Form>
              )}
            </Formik></>}

          {submitted &&
            <><p className="tc pb2 white">
              <FormattedMessage id="content|passwordreset|sent" />
            </p>
              <button
                className="bg-green white fw7 ph3 ttc di pv3 bn shadow-5"
                onClick={() => this.props.history.push(ROUTES.SIGN_IN)}
              >
                <FormattedMessage id="general|button|signin" />
              </button></>}
        </div>
      </div>
    );
  }
}

const injectIntlPasswordReset = injectIntl(PasswordReset);
export default withRouter(injectIntlPasswordReset);
