import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import {
  TAddInfoForm,
  IAddInfoFormDispatchToProps,
  IAddInfoFormMapStateToProps,
} from './AddInfoForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { IAppState } from '../../types/state';
import { getUserData } from '../../selectors/apiSelectors';
import { QUERIES } from '../../consts';
import FormikInput from '../../components/FormikInput/FormikInput';
import labelColor from '../../utils/labelColor';

export class AddInfoForm extends React.Component<TAddInfoForm> {
  onSubmit = async (event: any) => {
    console.log(event);
    const {
      profileTitle: eventProfileTitle,
      profileDescription: eventProfileDescription,
    } = event;
    const {
      // @ts-ignore
      user: { _id },
      user,
    } = this.props;
    const profileTitle =
      event.profileTitle === 'undefined'
        ? user && user.profileTitle
        : eventProfileTitle;

    const profileDescription =
      event.profileDescription === 'undefined'
        ? user && user.profileDescription
        : eventProfileDescription;
    console.log(profileTitle, profileDescription);

    await this.props.apiThunk.updateUser(
      QUERIES({ _id, profileTitle, profileDescription }).UPDATE_AD_INFO,
    );
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;

    const { user } = this.props;

    return (
      <Formik
        initialValues={{
          profileTitle: user ? user.profileTitle : '',
          profileDescription: user ? user.profileDescription : '',
        }}
        validationSchema={Yup.object().shape({
          profileTitle: Yup.string().required(
            formatMessage({
              id: 'content|adinfoform|adTitleRequired',
            }),
          ),
          profileDescription: Yup.string().required(
            formatMessage({
              id: 'content|adinfoform|adDescriptionRequired',
            }),
          ),
        })}
        onSubmit={this.onSubmit}
      >
        {formikProps => (
          <Form className="profile-form mh4 mt4 flex flex-column ph5-m ph7-l">
            <FormikInput
              {...formikProps}
              values={formikProps.values.profileTitle}
              errors={formikProps.errors.profileTitle}
              setFieldValue={formikProps.setFieldValue}
              name="profileTitle"
            />

            <label
              className={`${labelColor(
                formikProps.values.profileDescription,
              )} f6`}
              htmlFor="profileDescription"
            >
              <FormattedMessage id="general|placeholder|profileDescription" />
            </label>
            <textarea
              className="ba b--light-silver h5 resize-none"
              value={formikProps.values.profileDescription}
              name="profileDescription"
              onChange={event =>
                formikProps.setFieldValue(
                  'profileDescription',
                  event.target.value,
                )
              }
              placeholder={formatMessage({
                id: 'general|placeholder|profileDescription',
              })}
            />

            {this.props.submitButton}
          </Form>
        )}
      </Formik>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IAddInfoFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAddInfoFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlAddInfoForm = injectIntl(AddInfoForm);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlAddInfoForm),
);
