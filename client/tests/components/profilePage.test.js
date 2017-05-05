// /* eslint-disable no-unused-expressions */
// import configureMockStore from 'redux-mock-store';
// import expect from 'expect';
// import React from 'react';
// import { shallow } from 'enzyme';
// import ProfilePage from '../../components/ProfilePage/index';

// const store = configureMockStore()({});

// function setup(saving) {
//   const props = {
//     document: {},
//     saving,
//     store,
//     errors: {},
//     onSave: () => {},
//     onChange: () => {}
//   };

//   return shallow(<ProfilePage {...props} />);
// }

// describe('ProfilePageForm Test', () => {
//   it('should render self', () => {
//     const wrapper = setup();
//     expect(wrapper.length).toEqual(1);
//   });

//   it('should take props', () => {
//     const wrapper = setup();
//     expect(wrapper.props().errors).toExist;
//     expect(wrapper.props().userProps).toExist;
//     expect(wrapper.props().onChange).toExist;
//     expect(wrapper.props().onSubmit).toExist;
//   });
// });
