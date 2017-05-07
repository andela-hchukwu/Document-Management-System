import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import homePage from '../../components/HomePage/index';

describe('ProfilePage Test', () => {
  it('renders without crashing', () => {
    shallow(<homePage />);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <index>
        <homePage />
      </index>
    );
    expect(wrapper.contains(<homePage />)).toEqual(true);
  });
});
