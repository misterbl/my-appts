import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
// const windowAny: any = window;

// windowAny.google = {
//   maps: {
//     places: {
//       Autocomplete: class {},
//     },
//   },
// };
