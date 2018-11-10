import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TWeekDaysForm,
  IWeekDaysFormState,
  // IWeekDaysFormDispatchToProps,
} from './WeekDaysForm.d';
// import * as apiThunk from '../../actions/thunks/apiThunk';
// import { Formik, Form } from 'formik';
// import { connect } from 'react-redux';
// import { QUERIES } from 'src/consts';
// import { Dispatch, AnyAction, bindActionCreators } from 'redux';
// import Svg from '../Svg';
// import { drivingLicenseIcon, carIcon, noSmokingIcon } from 'src/styles/assets';

import Svg from '../Svg';
import { chevronDownIcon, chevronRigthIcon } from 'src/styles/assets';
import { Formik, Form } from 'formik';

// const customStyles = {
//   content: {
//     height: '100%',
//     top: 0,
//     right: 0,
//     left: 0,
//   },
// };
export class WeekDaysForm extends React.Component<
  TWeekDaysForm,
  IWeekDaysFormState
> {
  constructor(props: TWeekDaysForm) {
    super(props);
    this.state = {
      isElementOpen: false,
      selection: null,
    };

    // Modal.setAppElement('body');
  }

  checked = (day: string) => {
    const { category, values } = this.props;
    return values[category].indexOf(day) > -1;
  };

  handleChange = (day: string) => {
    const { category, values, setFieldValue } = this.props;
    const index = values[category].indexOf(day);
    if (index !== -1) {
      values[category].splice(index, 1);
    } else {
      values[category].push(day);
    }
    setFieldValue(`${category}${day}`, values[category].indexOf(day) > -1);
  };

  render() {
    const { category } = this.props;
    const { isElementOpen } = this.state;

    return (
      <>
        <div
          className="flex items-center mt3"
          onClick={() =>
            this.setState({
              isElementOpen: !isElementOpen,
            })
          }
        >
          <span className={isElementOpen ? 'dark-green' : 'white'}>
            <FormattedMessage id={`content|availabilityForm|${category}`} />
          </span>
          <Svg
            className="ml2 h-100"
            width="10pt"
            height="10pt"
            fill={isElementOpen ? '#137752' : 'white'}
            Icon={isElementOpen ? chevronDownIcon : chevronRigthIcon}
          />
        </div>

        {isElementOpen && (
          <div className="flex">
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Monday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                <FormattedMessage id="content|availabilityForm|mondayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Monday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Monday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Tuesday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|tuesdayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Tuesday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Tuesday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Wednesday')
                  ? 'dark-green bg-light-green'
                  : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|wednesdayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Wednesday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Wednesday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Thursday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|thursdayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Thursday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Thursday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Friday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|fridayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Friday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Friday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Saturday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|saturdayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Saturday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Saturday');
                }}
              />
            </label>
            <label
              className={`flex mh2 mt2 br-100 ${
                this.checked('Sunday') ? 'dark-green bg-light-green' : 'white'
              }`}
            >
              <span className="pa1">
                {' '}
                <FormattedMessage id="content|availabilityForm|sundayInitial" />
              </span>
              <input
                className="dn"
                checked={this.checked('Sunday')}
                type="checkbox"
                onChange={event => {
                  this.handleChange('Sunday');
                }}
              />
            </label>
          </div>
        )}
      </>
    );
  }
}
// export const mapDispatchToProps = (
//   dispatch: Dispatch<AnyAction>,
// ): IWeekDaysFormDispatchToProps => ({
//   apiThunk: bindActionCreators(apiThunk, dispatch),
// });

const injectIntlWeekDaysForm = injectIntl(WeekDaysForm);
export default injectIntlWeekDaysForm;
// export default connect(null)(injectIntlWeekDaysForm);
