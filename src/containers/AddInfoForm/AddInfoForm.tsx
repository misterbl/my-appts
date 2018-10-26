import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  IAddInfoFormComponent,
  IAddInfoFormsDispatchToProps,
} from './AddInfoForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';

// import ROUTES from '../../consts/routes';

export class AddInfoForm extends React.Component<IAddInfoFormComponent> {
  onSubmit = (event: any) => {
    const { profileTitle, profileDescription } = event;
    const query = `mutation {
      updateUser (profileTitle: "${profileTitle}", profileDescription: "${profileDescription}") {
        _id
        firstName
        lastName
        address
        profileTitle
        profileDescription
       
      }
    }`;
    this.props.apiThunk.postUserData(query);
  };

  labelColor = (input: string) => (input.length === 0 ? 'white' : 'moon-gray');

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column">
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

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAddInfoFormsDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlAddInfoForm = injectIntl(AddInfoForm);
export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(injectIntlAddInfoForm),
);
