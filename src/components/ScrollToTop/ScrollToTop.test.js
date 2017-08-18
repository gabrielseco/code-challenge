import React from 'react';
import { shallow } from 'enzyme';
import { ScrollToTopTesting } from './ScrollToTop';

describe('ScrollToTop suite', () => {
  it('should render the ScrollToTop component', () => {
    const wrapper = shallow(<ScrollToTopTesting><div>hola</div></ScrollToTopTesting>);
    expect(wrapper).toBeDefined();
    expect(wrapper.children().text()).toBe('hola');
  });

  it('should call component did update and call window.scroll', () => {
    global.scrollTo = jest.fn();
    const location = {};
    const node = <ScrollToTopTesting location={location}><div>hola</div></ScrollToTopTesting>;
    const wrapper = shallow(node, { lifecycleExperimental: true });
    expect(wrapper).toBeDefined();
    expect(wrapper.children().text()).toBe('hola');

    wrapper.setProps({ location: { test: 1 } });

    expect(global.scrollTo).toHaveBeenCalled();
  });

  it('should call component did update and not call window.scroll', () => {
    global.scrollTo = jest.fn();
    const node = <ScrollToTopTesting><div>hola</div></ScrollToTopTesting>;
    const wrapper = shallow(node, { lifecycleExperimental: true });
    expect(wrapper).toBeDefined();
    expect(wrapper.children().text()).toBe('hola');

    wrapper.setProps();

    expect(global.scrollTo).not.toHaveBeenCalled();
  });
});
