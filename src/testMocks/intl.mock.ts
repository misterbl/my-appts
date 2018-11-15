import {
  DateSource,
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelative,
  FormattedTime,
  InjectedIntl,
} from 'react-intl';

export const IntlMock: InjectedIntl = {
  formatDate: (value: DateSource, options?: FormattedDate.PropsBase) => '',
  formatTime: (value: DateSource, options?: FormattedTime.PropsBase) => '',
  formatRelative: (
    value: DateSource,
    options?: FormattedRelative.PropsBase & {
      now?: any; // tslint:disable-line:no-any
    },
  ) => '',
  formatNumber: (value: number, options?: FormattedNumber.PropsBase) => '',
  formatPlural: (value: number, options?: FormattedPlural.Base) => 'zero',
  formatMessage: (
    messageDescriptor: FormattedMessage.MessageDescriptor,
    values?: { [key: string]: string | number | boolean | Date | null },
  ) => messageDescriptor.id,
  formatHTMLMessage: (
    messageDescriptor: FormattedMessage.MessageDescriptor,
    values?: { [key: string]: string | number | boolean | Date | null },
  ) => '',
  locale: '',
  formats: '',
  messages: {},
  defaultLocale: '',
  defaultFormats: '',
  now: () => 0,
};

export default IntlMock;
