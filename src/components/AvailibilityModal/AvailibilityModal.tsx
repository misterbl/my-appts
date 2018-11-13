import * as React from 'react';
import * as Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TAvailibilityModal,
  IAvailibilityModalState,
  // IAvailibilityModalDispatchToProps,
  // IAvailibilityModalDispatchToProps,
} from './AvailibilityModal.d';
// import * as apiThunk from '../../actions/thunks/apiThunk';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as apiThunk from '../../actions/thunks/apiThunk';
// import { QUERIES } from 'src/consts';
// import { Dispatch, AnyAction, bindActionCreators } from 'redux';
// import Svg from '../Svg';
// import { drivingLicenseIcon, carIcon, noSmokingIcon } from 'src/styles/assets';
// import { QUERIES } from 'src/consts';
// import Svg from '../Svg';
// import { chevronDownIcon, chevronRigthIcon } from 'src/styles/assets';
import WeekDaysForm from '../WeekDaysForm';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { QUERIES } from 'src/consts';

const customStyles = {
  content: {
    height: '100%',
    top: 0,
    right: 0,
    left: 0,
  },
};
export class AvailibilityModal extends React.Component<
  TAvailibilityModal,
  IAvailibilityModalState
> {
  slots = [
    'beforeSchool',
    'morning',
    'noon',
    'afternoon',
    'afterSchool',
    'evening',
    'night',
  ];
  constructor(props: TAvailibilityModal) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };

    Modal.setAppElement('body');
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onSubmit = async (event: any) => {
    if (this.props.user && event) {
      const { _id } = this.props.user;
      this.props.apiThunk.updateUser(
        QUERIES({
          _id,
          availability: event,
        }).UPDATE_AVAILABILITY,
      );
    }
    this.setState({ modalIsOpen: false }); //
  };

  handleClick = () => {
    this.slots.map((slot: any, index: number) => {
      const node = document.getElementById(`submitForm${slot}`);
      if (node) {
        node.click();
      }
    });
  };

  renderWeekDaysForms = (values: any, setFieldValue: any) => {
    return this.slots.map((slot: string) => (
      <WeekDaysForm
        {...this.props}
        key={slot}
        values={values}
        setFieldValue={setFieldValue}
        category={slot}
      />
    ));
  };
  render() {
    if (this.props.user) {
      const { user } = this.props;
    }
    return (
      <div>
        <button
          className="tl w-100 bt-0 bl-0 br-0 bb bt-0 bg-transparent b--moon-gray mt4"
          onClick={this.openModal}
        >
          <FormattedMessage id="content|availabiltyForm|selectaAvailability" />
        </button>
        <Modal
          className="green-bg overflow-y-auto max-vh-100 ph5-m ph7-l"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="ml2 mt2 f3 white bn bg-transparent"
            onClick={this.closeModal}
          >
            x
          </button>
          <p className="white mh4 mt3 mb1 f4">
            <FormattedMessage id="content|availabiltyForm|availability" />
          </p>
          <p className="white mh4 mt0 mb4 f6">
            <FormattedMessage id="content|availabiltyForm|selectaAvailability" />
          </p>
          <Formik
            {...this.props.user && this.props.user}
            initialValues={{
              beforeSchool:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.beforeSchool
                  : [],
              morning:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.morning
                  : [],
              noon:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.noon
                  : [],
              afternoon:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.afternoon
                  : [],
              afterSchool:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.afterSchool
                  : [],
              evening:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.evening
                  : [],
              night:
                this.props.user && this.props.user.availability
                  ? this.props.user.availability.night
                  : [],
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="placeholder-white white mh4 ttc flex flex-column mb4">
                <button
                  className="ttu white absolute top-1 right-1 bn bg-transparent"
                  onClick={this.handleClick}
                  type="submit"
                >
                  <FormattedMessage id="general|button|ok" />
                </button>
                {this.renderWeekDaysForms(values, setFieldValue)}
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}

const injectIntlAvailibilityModal = injectIntl(AvailibilityModal);
export default injectIntlAvailibilityModal;
