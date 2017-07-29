import React from 'react';
import { shallow } from 'enzyme';
import Tag from './Tag';

describe('Tag suite', () => {
  it('should render the tag component', () => {
    const wrapper = shallow(<Tag name="React" color="#FF0000" />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.tag p').text()).toBe('React');
    expect(wrapper.find('.tag').prop('style')).toEqual({ backgroundColor: '#FF0000' });
  });
});
