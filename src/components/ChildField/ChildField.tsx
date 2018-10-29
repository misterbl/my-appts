import * as React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import { TChieldField, IChieldFieldState } from './ChildField.d';

export class ChildField extends React.Component<
  TChieldField,
  IChieldFieldState
> {
  constructor(props: TChieldField) {
    super(props);
    this.state = {
      focused: '',
    };
  }

  labelColor = (input?: string) => (input === '' ? 'white' : 'moon-gray');

  render() {
    const {
      intl: { formatMessage },
      values,
      setFieldValue,
      childrenNumber,
    } = this.props;

    return (
      <>
        <h4>
          <FormattedMessage id="content|childfield|child" />
          {` ${childrenNumber! + 1}`}
        </h4>
        <label
          className={`${this.labelColor(values['name' + childrenNumber])} f6`}
          htmlFor={`name${childrenNumber}`}
        >
          <FormattedMessage id="general|placeholder|name" />
        </label>
        <input
          value={values['name' + childrenNumber]}
          name={`name${childrenNumber}`}
          onFocus={() => this.setState({ focused: `name${childrenNumber}` })}
          onChange={event => {
            setFieldValue('name' + childrenNumber, event.target.value);
          }}
          placeholder={formatMessage({
            id: 'general|placeholder|name',
          })}
        />
        <label
          className={`${this.labelColor(values['age' + childrenNumber])} f6`}
          htmlFor={`age${childrenNumber}`}
        >
          <FormattedMessage id="general|placeholder|age" />
        </label>
        <input
          value={values['age' + childrenNumber]}
          name={`age${childrenNumber}`}
          onFocus={() => this.setState({ focused: `age${childrenNumber}` })}
          onChange={event => {
            setFieldValue('age' + childrenNumber, event.target.value);
          }}
          placeholder={formatMessage({
            id: 'general|placeholder|age',
          })}
        />
        <label
          className={`${this.labelColor(values['dob' + childrenNumber])} f6`}
          htmlFor={`dob${childrenNumber}`}
        >
          <FormattedMessage id="general|placeholder|dob" />
        </label>
        <input
          value={values['dob' + childrenNumber]}
          name={`dob${childrenNumber}`}
          onFocus={() => this.setState({ focused: `dob${childrenNumber}` })}
          onChange={event => {
            setFieldValue('dob' + childrenNumber, event.target.value);
          }}
          placeholder={formatMessage({
            id: 'general|placeholder|dob',
          })}
        />
        <label
          className={`${this.labelColor(values['school' + childrenNumber])} f6`}
          htmlFor={`school${childrenNumber}`}
        >
          <FormattedMessage id="general|placeholder|school" />
        </label>
        <input
          value={values['school' + childrenNumber]}
          name={`school${childrenNumber}`}
          onFocus={() => this.setState({ focused: `school${childrenNumber}` })}
          onChange={event => {
            setFieldValue('school' + childrenNumber, event.target.value);
          }}
          placeholder={formatMessage({
            id: 'general|placeholder|school',
          })}
        />
        <label
          className={`${this.labelColor(
            values['information' + childrenNumber],
          )} f6`}
          htmlFor={`information${childrenNumber}`}
        >
          <FormattedMessage id="general|placeholder|information" />
        </label>
        <input
          value={values['information' + childrenNumber]}
          name={`information${childrenNumber}`}
          onFocus={() =>
            this.setState({ focused: `information${childrenNumber}` })
          }
          onChange={event => {
            setFieldValue('information' + childrenNumber, event.target.value);
          }}
          placeholder={formatMessage({
            id: 'general|placeholder|information',
          })}
        />
      </>
    );
  }
}

export default injectIntl(ChildField);
