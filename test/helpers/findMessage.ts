import { ShallowWrapper } from 'enzyme';

const findMessage = (id: string, wrapper: ShallowWrapper) =>
  wrapper.findWhere(
    (element: ShallowWrapper) =>
      element.is('FormattedMessage') && element.prop('id') === id,
  );

export default findMessage;
