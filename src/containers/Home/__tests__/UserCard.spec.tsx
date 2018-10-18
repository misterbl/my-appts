// import React from 'react';
// import { shallow } from 'enzyme';
// import Loading from '@jg/loading';
// import { CreateTeamForm } from '../CreateTeamForm';
// import formikRenderMock from '../../../testMocks/formikRender.mock';

// describe('CreateTeamForm', () => {
//   const wrapper = shallow(
//     CreateTeamForm({
//       ...formikRenderMock,
//       values: { teamName: 'teamName' },
//       initialValues: { teamName: '' },
//       isInFlight: false,
//       isError: false,
//       pageGuid: '',
//       teamName: '',
//     }),
//   );
//   it('should render a textarea element', () => {
//     expect(wrapper.find('textarea').length).toBe(1);
//   });
//   it('should render a form element', () => {
//     expect(wrapper.find('form').length).toBe(1);
//   });
//   it('should render a CharacterCount element', () => {
//     expect(wrapper.find('CharacterCount').length).toBe(1);
//   });
//   it('should render a button element', () => {
//     expect(wrapper.find('button').length).toBe(1);
//   });
//   it('should render a button element', () => {
//     expect(wrapper.find('button').length).toBe(1);
//   });
//   it('should render the text on the button ', () => {
//     expect(
//       wrapper
//         .find('button')
//         .find('FormattedMessage')
//         .prop('id'),
//     ).toEqual('content|createteam|button');
//   });
//   describe('onKeyPress', () => {
//     it('prevents enter key', () => {
//       const textarea = wrapper.find('textarea');
//       const event = {
//         key: 'Enter',
//         preventDefault: jest.fn(),
//       };
//       textarea.simulate('keyPress', event);
//       expect(event.preventDefault).toBeCalled();
//     });
//     it('doesn’t prevent other keys', () => {
//       const textarea = wrapper.find('textarea');
//       const event = {
//         key: 'Something else',
//         preventDefault: jest.fn(),
//       };
//       textarea.simulate('keyPress', event);
//       expect(event.preventDefault).not.toBeCalled();
//     });
//   });
//   it('matches the snapshot', () => {
//     expect(
//       CreateTeamForm({
//         ...formikRenderMock,
//         values: { teamName: 'teamName' },
//         initialValues: { teamName: '' },
//         isInFlight: false,
//         isError: false,
//         pageGuid: '',
//         teamName: '',
//       }),
//     ).toMatchSnapshot();
//   });
//   it('Make sure button is disabled when there is a team name but it has caused errors', () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         errors={{ teamName: 'error on teamname' }}
//         isInFlight={false}
//         isError={false}
//         pageGuid="123"
//         teamName=""
//       />,
//     );
//     expect(
//       shallowCreateTeamForm.find('.jg-btn[type="submit"]').prop('disabled'),
//     ).toBeTruthy();
//   });
//   it('Make sure button is enabled when there is a valid team name', () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         isInFlight={false}
//         isError={false}
//         pageGuid="123"
//         teamName=""
//       />,
//     );
//     expect(
//       shallowCreateTeamForm.find('.jg-btn[type="submit"]').prop('disabled'),
//     ).toBeFalsy();
//   });
//   it('Make sure the team name error is shown if it has been touched', () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         errors={{ teamName: 'error on teamname' }}
//         // @ts-ignore
//         touched={{ teamName: true }}
//         isError={false}
//       />,
//     );
//     expect(shallowCreateTeamForm.find('.jg-form-error-copy').text()).toBe(
//       'error on teamname',
//     );
//   });
//   it('Make sure the team name error is NOT shown if it has NOT been touched', () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         errors={{ teamName: 'error on teamname' }}
//         isInFlight={false}
//         isError={false}
//         pageGuid="123"
//         teamName=""
//       />,
//     );
//     expect(shallowCreateTeamForm.find('.jg-form-error-copy')).toHaveLength(0);
//   });
//   it('renders a loading component when isInFlight is true', () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         errors={{ teamName: 'error on teamname' }}
//         isInFlight={true}
//         isError={false}
//         pageGuid="123"
//         teamName=""
//       />,
//     );
//     expect(shallowCreateTeamForm.find(Loading).length).toEqual(1);
//   });
//   it("does not render a loading component when isInFlight is true but the button's text", () => {
//     const shallowCreateTeamForm = shallow(
//       <CreateTeamForm
//         {...formikRenderMock}
//         values={{ teamName: 'teamName' }}
//         initialValues={{ teamName: '' }}
//         errors={{ teamName: 'error on teamname' }}
//         isInFlight={false}
//         isError={false}
//         pageGuid="123"
//         teamName=""
//       />,
//     );
//     expect(shallowCreateTeamForm.find(Loading).length).toEqual(0);
//     expect(
//       shallowCreateTeamForm
//         .find('button')
//         .find('FormattedMessage')
//         .prop('id'),
//     ).toEqual('content|createteam|button');
//   });
//   describe('Alert', () => {
//     it("it doesn't show an Alert if isError is false", () => {
//       expect(wrapper.find('Alert').length).toEqual(0);
//     });
//   });
// });
