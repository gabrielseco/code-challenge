import React from 'react';
import { shallow } from 'enzyme';
import { ScrollToTopTesting } from './ScrollToTop';

describe('ScrollToTop suite', () => {
  it('should render the ScrollToTop component', () => {
    const wrapper = shallow(<ScrollToTopTesting><div>hola</div></ScrollToTopTesting>);
    expect(wrapper).toBeDefined();
    expect(wrapper.children().text()).toBe('hola');
  });
});
