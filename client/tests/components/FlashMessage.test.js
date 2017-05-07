import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import flashMessage from '../../components/FlashMessageList/index';

describe('ProfilePage Test', () => {
  it('renders without crashing', () => {
    shallow(<flashMessage />);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow(
      <index>
        <flashMessage />
      </index>
    );
    expect(wrapper.contains(<flashMessage />)).toEqual(true);
  });
});
