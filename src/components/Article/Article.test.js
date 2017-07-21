import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Article from './Article';

describe('Article suite', () => {
  const articleMock = {
    id: 'XX0504S023',
    title: 'Avicii\'s return',
    author: 'Avicii',
    excerpt: 'Avicii annouces album after tour hiatus',
  };
  it('should render the article component', () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(<Article data={articleMock} onRemove={onClickHandler} />);
    expect(wrapper.find(Link).prop('to')).toBe(`detail/${articleMock.id}`);
    expect(wrapper.find('.author').text()).toBe(articleMock.author);
    expect(wrapper.find('.excerpt').text()).toBe(articleMock.excerpt);
    expect(wrapper.find('.article > button').text()).toBe('REMOVE');
  });

  it('should click on remove button and emit the event handler onRemove', () => {
    const onClickHandler = jest.fn();
    const wrapper = shallow(<Article data={articleMock} onRemove={onClickHandler} />);
    const btn = wrapper.find('.article > button');

    btn.simulate('click');

    expect(onClickHandler).toHaveBeenCalled();
  });
});
