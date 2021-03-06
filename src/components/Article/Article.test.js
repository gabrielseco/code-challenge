import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import Article from './Article';
import utils from './../../utils';

describe('Article suite', () => {
  const articleMock = {
    id: 'XX0504S023',
    title: "Avicii's return",
    author: 'Avicii',
    excerpt: 'Avicii annouces album after tour hiatus',
  };
  const onEditHandler = jest.fn();
  const onRemoveHandler = jest.fn();
  it('should render the article component', () => {
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    expect(wrapper.find(Link).prop('to')).toBe(`detail/${articleMock.id}`);
    expect(wrapper.find('.author').text()).toBe(articleMock.author);
    expect(wrapper.find('.excerpt').text()).toBe(articleMock.excerpt);
    expect(wrapper.find('.edit-action > h3').text()).toBe('Edit');
    expect(wrapper.find('.delete-action > h3').text()).toBe('Delete');
  });

  it('should click on remove button and emit the event handler onRemove', () => {
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    const btn = wrapper.find('.delete-action');

    btn.simulate('click');

    expect(onRemoveHandler).toHaveBeenCalled();
  });

  it('should click on edit button and emit the event handler onRemove', () => {
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    const btn = wrapper.find('.edit-action');

    btn.simulate('click');

    expect(onEditHandler).toHaveBeenCalled();
  });

  it('should open the actions', () => {
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    wrapper.instance().openActions();
    expect(wrapper.state().visible).toBeTruthy();
    expect(wrapper.find('.edit-action').hasClass('visible')).toBeTruthy();
    expect(wrapper.find('.delete-action').hasClass('visible')).toBeTruthy();
  });

  it('should call componentWillUpdate', () => {
    const spy = jest.spyOn(utils, 'addEventsToDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );

    wrapper.instance().componentWillUpdate(undefined, {
      visible: true,
    });
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('should not call componentWillUpdate', () => {
    const spy = jest.spyOn(utils, 'addEventsToDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );

    wrapper.instance().componentWillUpdate(undefined, {
      visible: false,
    });
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('should call componentDidUpdate', () => {
    const spy = jest.spyOn(utils, 'removeEventsFromDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );

    wrapper.instance().componentDidUpdate(undefined, {
      visible: true,
    });
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('should not call componentDidUpdate', () => {
    const spy = jest.spyOn(utils, 'removeEventsFromDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );

    wrapper.instance().componentDidUpdate(undefined, {
      visible: false,
    });
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('should call componentWillUnmount', () => {
    const spy = jest.spyOn(utils, 'removeEventsFromDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    wrapper.instance().openActions();
    wrapper.instance().componentWillUnmount();
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it('should not call componentWillUnmount', () => {
    const spy = jest.spyOn(utils, 'removeEventsFromDocument');
    const wrapper = shallow(
      <Article
        data={articleMock}
        onRemove={onRemoveHandler}
        onEdit={onEditHandler}
      />,
    );
    wrapper.instance().componentWillUnmount();
    expect(spy).not.toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });
});
