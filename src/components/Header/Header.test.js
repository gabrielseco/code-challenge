import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { HeaderTesting } from './Header';

describe('Header suite', () => {
  it('should render the header component', () => {
    const wrapper = shallow(<HeaderTesting />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Link).prop('to')).toBe('/');
    expect(wrapper.find('h2').text()).toBe('Billin');
  });

  it('should render the header component with a different title', () => {
    const wrapper = shallow(<HeaderTesting title="Avicci's" />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Link).prop('to')).toBe('/');
    expect(wrapper.find('h2').text()).toBe('Avicci\'s');
  });

  it('should test the click event', () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = shallow(<HeaderTesting title="Avicci's" history={history} />);
    const header = wrapper.find('header');
    expect(wrapper).toBeDefined();

    header.simulate('click');

    expect(history.push).toHaveBeenCalled();
  });
});
