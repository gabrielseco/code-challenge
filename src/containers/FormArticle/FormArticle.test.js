import React from 'react';
import { shallow } from 'enzyme';
import FormArticle from './FormArticle';
import { Tag } from './../../components';

describe('FormArticle suite', () => {
  const onSubmitHandler = jest.fn();
  const articleMock = {
    title: 'Avicii\'s title',
    author: 'Tim berg',
    content: 'Test',
    excerpt: 'Test',
    tags: [{
      name: 'React',
    }],
    published: true,
  };
  it('should render the form article when is creating', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.form-article h1').text()).toBe('Create a new article');
    expect(wrapper.find('input[type="submit"]').prop('value')).toBe('Send');
  });

  it('should render when is editing', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} edit />);
    expect(wrapper).toBeDefined();
    wrapper.instance().componentWillReceiveProps({ article: articleMock });
    expect(wrapper.find('.form-article h1').text()).toBe('Editing article');
    expect(wrapper.find('input[type="submit"]').prop('value')).toBe('Update');
    const inputs = ['title', 'author'];
    inputs.map(input => {
      expect(wrapper.state('form')[input]).toBe(articleMock[input]);
      expect(wrapper.find(`input[name="${input}"]`).prop('value')).toBe(articleMock[input]);
      return null;
    });
    const textareas = ['content', 'excerpt'];
    textareas.map(input => {
      expect(wrapper.state('form')[input]).toBe(articleMock[input]);
      expect(wrapper.find(`textarea[name="${input}"]`).prop('value')).toBe(articleMock[input]);
      return null;
    });
    expect(wrapper.state('form').published).toBe(articleMock.published);
    expect(wrapper.find('input[name="published"]').prop('checked')).toBe(articleMock.published);
    const tags = wrapper.find(Tag);
    expect(tags.length).toBe(articleMock.tags.length);
    expect(tags.at(0).prop('name')).toBe(articleMock.tags[0].name);
  });

  it('should not update the article in componentWillReceiveProps', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} edit />);
    expect(wrapper).toBeDefined();
    wrapper.instance().componentWillReceiveProps({ article: undefined });
    expect(wrapper.state('form').title).toBe('');
  });

  it('should called onChange and change the state of the form', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);
    const event = {
      target: {
        name: 'title',
        value: 'Avici',
      },
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state('form').title).toBe(event.target.value);
  });

  it('should called onChangeCheckBox and change the state of the form', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);
    const event = {
      target: {
        name: 'published',
        checked: true,
      },
    };
    wrapper.instance().onChangeCheckBox(event);
    expect(wrapper.state('form').published).toBe(event.target.checked);
  });

  it('should called onChangeTag and change the tag state', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);
    const event = {
      target: {
        value: 'React',
      },
    };
    wrapper.instance().onChangeTag(event);
    expect(wrapper.state('tag').name).toBe(event.target.value);
  });

  it('should called onRemove and delete a tag ', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} article={articleMock} edit />);
    const event = {
      index: 0,
    };
    wrapper.instance().onRemove(event);
    expect(wrapper.state('form').tags.length).toBe(0);
  });

  it('should push a tag to the form tags array', () => {
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} edit />);
    wrapper.instance().componentWillReceiveProps({ article: articleMock });
    const event = {
      keyCode: 13,
      preventDefault: jest.fn(),
    };
    const tagEvent = {
      target: {
        value: 'Angular',
      },
    };
    wrapper.instance().onChangeTag(tagEvent);
    wrapper.instance().writeTag(event);
    const tags = wrapper.find(Tag);
    expect(wrapper.state('form').tags.length).toBe(2);
    expect(tags.at(0).prop('name')).toBe(articleMock.tags[0].name);
    expect(tags.at(1).prop('name')).toBe(tagEvent.target.value);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not push the tag to the forms array', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);
    wrapper.instance().writeTag(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should called onSubmit when sending the form', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<FormArticle onSubmit={onSubmitHandler} />);
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(onSubmitHandler).toHaveBeenCalled();
  });
});
