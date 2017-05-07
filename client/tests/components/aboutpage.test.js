import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import aboutPage from '../../components/AboutPage/index';

describe('ProfilePage Test', () => {
  it('renders without crashing', () => {
    shallow(<aboutPage />);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <index>
        <aboutPage />
      </index>
    );
    expect(wrapper.contains(<aboutPage />)).toEqual(true);
  });
});
