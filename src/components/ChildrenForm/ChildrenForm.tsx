import * as React from 'react';
import { Formik, Form } from 'formik';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  IChildrenFormComponent,
  IChildrenFormDispatchToProps,
  IChildrenFormMapStateToProps,
  IChildrenFormState,
} from './ChildrenForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
// import { ROUTES, QUERIES } from '../../consts';
import { getUserData } from 'src/selectors/apiSelectors';
import { IAppState } from 'src/types/state';
import Svg from '../Svg';
import { AccountIcon, PlusIcon } from 'src/styles/assets';
import ChildFied from '../ChildField';
import { QUERIES } from 'src/consts';

export class ChildrenForm extends React.Component<
  IChildrenFormComponent,
  IChildrenFormState
> {
  constructor(props: IChildrenFormComponent) {
    super(props);
    this.state = {
      childrenNumber: 0,
      formElement: [],
    };
  }
  onSubmit = async (event: any) => {
    console.log(event);

    const { profileTitle, profileDescription } = event;
    // @ts-ignore
    const { _id } = this.props.user;
    await this.props.apiThunk.updateUser(
      QUERIES({ _id, profileTitle, profileDescription }).UPDATE_AD_INFO,
    );
  };

  displayChildField = (values: any, setFieldValue: any) => (
    <ChildFied
      childrenNumber={this.state.childrenNumber + 1}
      key={this.state.childrenNumber}
      values={values}
      setFieldValue={setFieldValue}
    />
  );

  addChildField = (values: any, setFieldValue: any) => {
    const { formElement } = this.state;
    formElement.push(this.displayChildField(values, setFieldValue));
    this.setState({
      childrenNumber: this.state.childrenNumber + 1,
    });
  };

  initialValues = (index: any) =>
    ['name', 'age', 'dob', 'school', 'information'].reduce(
      (carry: any, item: any) => {
        for (let i = 0; i <= index; i++) {
          carry[`${item}${i}`] = '';
        }
        return carry;
      },
      {},
    );

  render() {
    const { user } = this.props;
    const formElement = Array.from(new Array(this.state.childrenNumber));

    return (
      <div>
        <div className="flex pv4 ml4">
          {user && user.avatar ? (
            <img
              className="br-100 h3 w3"
              src={user.avatar || ''}
              alt="user's profile"
            />
          ) : (
            <Svg Icon={AccountIcon} width="4rem" height="4rem" />
          )}
          <strong className="self-center ml3">
            {' '}
            <FormattedMessage id="content|childrenform|title" />
          </strong>
        </div>
        <span className="f6">
          <FormattedMessage id="content|childrenform|explanation" />
        </span>
        <Formik
          initialValues={this.initialValues(this.state.childrenNumber)}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="profile-form mh4 flex flex-column mt4">
              {formElement.map((element, index) => (
                <ChildFied
                  childrenNumber={index}
                  key={index}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              ))}
              <Svg
                handleClick={() => this.addChildField(values, setFieldValue)}
                Icon={PlusIcon}
                className="self-end mb4"
              />
              //@ts-ignore
              {this.props.submitButton}
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
): IChildrenFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IChildrenFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlChildrenForm = injectIntl(ChildrenForm);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlChildrenForm),
);
