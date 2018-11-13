import * as React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  TAvailabilityForm,
  IAvailabilityFormDispatchToProps,
  IAvailabilityFormMapStateToProps,
  IAvailabilityState,
} from './AvailabilityForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { getUserData } from '../../selectors/apiSelectors';
import { AvailibilityModal } from '../AvailibilityModal/AvailibilityModal';
import { IAppState } from '../../types/state';

import MomentLocaleUtils from 'react-day-picker/moment';
import DayPicker from 'react-day-picker';
import 'moment/locale/fr';
import 'react-day-picker/lib/style.css';
import { QUERIES } from '../../consts';
import { Formik, Form } from 'formik';
// http://react-day-picker.js.org/examples/localization-moment

const modifiersStyles = {
  color: 'white',
  backgroundColor: '#ffc107',
};
export class AvailabilityForm extends React.Component<
  TAvailabilityForm,
  IAvailabilityState
> {
  constructor(props: TAvailabilityForm) {
    super(props);

    this.state = {
      selectedDays: (this.props.user && this.props.user.unavailability) || [],
      selectedDay: undefined,
    };
  }

  handleDayClick = (day: any) => {
    const { selectedDays } = this.state;
    const selectedIndex = selectedDays.indexOf(day.toString());

    if (selectedIndex > -1) {
      selectedDays.splice(selectedIndex, 1);
      this.setState({ selectedDays });
      return;
    }
    selectedDays.push(day.toString());
    this.setState({ selectedDays });
  };

  onSubmit = () => {
    const { user } = this.props;
    if (this.props.user) {
      const { _id } = this.props.user;
      this.props.apiThunk.updateUser(
        QUERIES({
          _id,
          unavailability: this.state.selectedDays,
        }).UPDATE_UNAVAILABILITY,
      );
    }
  };

  render() {
    const { user } = this.props;

    return (
      <div className="mt3 mh3 ph5-m ph7-l">
        <p className="f5 gray mb2">
          <FormattedMessage id="content|availabilityForm|explanation" />
        </p>
        <span className="tc">
          <AvailibilityModal
            apiThunk={this.props.apiThunk}
            intl={this.props.intl}
            user={user}
          />
        </span>
        <div className="mt5">
          <p>
            <FormattedMessage id="content|availabilityForm|calendarExplanation" />
          </p>
          {/* <p>
          <select onChange={this.handleSelectChange}>
            <option value="en">English</option>
            <option value="fr">Francais</option>
          </select>
        </p> */}
          <DayPicker
            className="mt2 ba b--orange w-100 w-70-m"
            selectedDays={this.state.selectedDays.map(
              (date: any) => new Date(date),
            )}
            onDayClick={this.handleDayClick}
            localeUtils={MomentLocaleUtils}
            locale={this.props.intl.locale}
          />
          <Formik initialValues={{}} onSubmit={this.onSubmit}>
            <Form>{this.props.submitButton}</Form>
          </Formik>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IAvailabilityFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAvailabilityFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlAvailabilityForm = injectIntl(AvailabilityForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlAvailabilityForm);
