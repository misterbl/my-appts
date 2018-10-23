import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// jest.mock('@jg/logger', () => ({
//   __esModule: true,
//   default: {
//     trace: () => null,
//     debug: () => null,
//     log: () => null,
//     info: () => null,
//     warn: () => null,
//     error: () => null,
//   },
// })); // TODO delete this or adapt if needed
