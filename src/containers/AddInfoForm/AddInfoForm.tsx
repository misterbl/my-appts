import * as React from 'react';
import { Formik, Form, FormikProps } from 'formik';

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

export const AddInfoForm = (props: TAddInfoForm) => {
  const {
    values,
    setFieldValue,
    errors,
    intl: { formatMessage },
    submitButton,
  } = props;
  return (
    <Form className="profile-form mh4 mt4 flex flex-column ph5-m ph7-l">
      <FormikInput
        {...props}
        values={values.profileTitle}
        errors={errors.profileTitle}
        setFieldValue={setFieldValue}
        name="profileTitle"
      />

      <label
        className={`${labelColor(values.profileDescription)} f6`}
        htmlFor="profileDescription"
      >
        <FormattedMessage id="general|placeholder|profileDescription" />
      </label>
      <textarea
        className="ba b--light-silver h5 resize-none"
        value={values.profileDescription}
        name="profileDescription"
        onChange={event =>
          setFieldValue('profileDescription', event.target.value)
        }
        placeholder={formatMessage({
          id: 'general|placeholder|profileDescription',
        })}
      />

      {submitButton}
    </Form>
  );
};
export class AddInfo extends React.Component<TAddInfoForm> {
  onSubmit = async (event: any) => {
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
        render={
          /* istanbul ignore next */ formikProps => (
            <AddInfoForm {...formikProps} {...this.props} />
          )
        }
      />
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

const injectIntlAddInfoForm = injectIntl(AddInfo);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlAddInfoForm),
);
