import React from 'react';
import { shallow } from 'enzyme';
import FontAwesome from 'react-fontawesome';
import Button from './Button';

describe('Button suite', () => {
  it('should render the button component', () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(<Button icon="plus" size="2x" onClick={onClickHandler} />);
    const btn = wrapper.find('button');
    const icon = wrapper.find(FontAwesome);
    expect(icon.prop('size')).toBe('2x');
    expect(icon.prop('name')).toBe('plus');
    expect(btn).toBeDefined();
  });

  it('should emit props when the button is clicked', () => {
    const onClickHandler = jest.fn();

    const wrapper = shallow(<Button icon="plus" size="2x" onClick={onClickHandler} />);
    const btn = wrapper.find('button');
    btn.simulate('click');
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('should not emit props when the button is clicked', () => {
    const onClickHandler = jest.fn();

    const wrapper = shallow(<Button icon="plus" size="2x" />);
    const btn = wrapper.find('button');
    btn.simulate('click');
    expect(onClickHandler).not.toHaveBeenCalled();
  });
});
