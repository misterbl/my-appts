import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IPasswordResetComponent, IPasswordReseState } from './PasswordReset.d';
import ROUTES from '../../consts/routes';
import labelColor from '../../utils/labelColor';
import ErrorMessage from 'src/components/ErrorMessage';

class PasswordReset extends React.Component<
  IPasswordResetComponent,
  IPasswordReseState
> {
  constructor(props: IPasswordResetComponent) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onSubmit = (event: any) => {
    console.log(event);

    const { email } = event;
    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ submitted: true });
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { submitted } = this.state;

    return (
      <div className="vh-100 green-bg tc ">
        <p className="kidappi white ma0 pt5 w-100">Kidappi</p>
        <div className="absolute bottom-2 ph3">
          {!submitted && (
            <>
              <p className="tc pb2 white">
                <FormattedMessage id="content|passwordreset|directives" />
              </p>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email()
                    .required(
                      formatMessage({ id: 'content|login|emailrequired' }),
                    ),
                })}
                onSubmit={this.onSubmit}
              >
                {({ values, isSubmitting, setFieldValue, touched, errors }) => (
                  <Form className="form-green flex flex-column white-input ">
                    <label
                      className={`${labelColor(
                        values.email,
                        'white',
                        'o-0',
                      )} tl f6`}
                      htmlFor="email"
                    >
                      <FormattedMessage id="general|placeholder|email" />
                    </label>
                    <input
                      autoComplete="new-email"
                      value={values.email}
                      name="email"
                      onChange={event =>
                        setFieldValue('email', event.target.value)
                      }
                      type="text"
                      placeholder={formatMessage({
                        id: 'general|placeholder|email',
                      })}
                    />
                    {touched.email &&
                      errors.email && (
                        <ErrorMessage
                          fill="#cce281"
                          className="green-error"
                          error={errors.email}
                        />
                      )}
                    <button
                      className="loginNext fw7 ph3 ttu di pv3 mv5 bn shadow-5"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <FormattedMessage id="general|button|send" />
                    </button>

                    {/* {error && <p>{error.message}</p>} */}
                  </Form>
                )}
              </Formik>
            </>
          )}

          {submitted && (
            <>
              <p className="tc pb2 white">
                <FormattedMessage id="content|passwordreset|sent" />
              </p>
              <button
                className="loginNext fw7 ph3 ttu di pv3 mv5 bn shadow-5"
                onClick={() => this.props.history.push(ROUTES.SIGN_IN)}
              >
                <FormattedMessage id="general|button|signin" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const injectIntlPasswordReset = injectIntl(PasswordReset);
export default withRouter(injectIntlPasswordReset);
