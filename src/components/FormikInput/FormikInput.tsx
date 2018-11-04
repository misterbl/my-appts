import * as React from 'react';
import labelColor from 'src/utils/labelColor';
import { FormattedMessage, injectIntl } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import { TFormikInput } from './FormikInput.d';
const FormikInput = (props: TFormikInput) => {
  const {
    values,
    name,
    errors,
    setFieldValue,
    intl: { formatMessage },
  } = props;
  return (
    <>
      <label className={`${labelColor(values)} f6`} htmlFor={name}>
        <FormattedMessage id={`general|placeholder|${name}`} />
      </label>
      <input
        className={`${errors ? 'mb0' : 'mb4'}`}
        value={values}
        name={name}
        onChange={event => setFieldValue(name, event.target.value)}
        type="text"
        placeholder={formatMessage({
          id: `general|placeholder|${name}`,
        })}
      />
      {errors && <ErrorMessage fill="red" className="red mb3" error={errors} />}
    </>
  );
};
export default injectIntl(FormikInput);
