import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound suite', () => {
  it('should render the button component', () => {
    const wrapper = shallow(<NotFound />);
    const linkComponent = wrapper.find(Link);
    expect(wrapper).toBeDefined();
    expect(linkComponent.prop('to')).toBe('/');
    expect(linkComponent.children().node).toBe('Back Home');
  });
});
