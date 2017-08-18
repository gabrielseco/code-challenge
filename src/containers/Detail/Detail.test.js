import React from 'react';
import { shallow } from 'enzyme';
import { DetailTesting, mapStateToProps } from './Detail';
import { Tag } from './../../components';

const dispatch = jest.fn();
const match = {
  params: {
    id: 'XXX04043',
  },
};

const articleMock = {
  title: 'Jest',
  author: '@Cpojer',
  content: 'Jest or not to jest',
  published: false,
};
const author = `By: ${articleMock.author}`;
const published = article => `Published: ${article.published ? 'Yes' : 'No'}`;


describe('Detail suite', () => {
  it('renders Detail without any state injected', () => {
    const wrapper = shallow(<DetailTesting dispatch={dispatch} match={match} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').text()).toBe('Loading');
  });

  it('should inject article as prop and render published as No', () => {
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock} />;
    const wrapper = shallow(node);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe(published(articleMock));
  });

  it('should inject article as prop and render published as Yes', () => {
    const articleMock2 = {
      ...articleMock,
      published: true,
    };
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock2} />;
    const wrapper = shallow(node);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe(published(articleMock2));
  });

  it('should inject article as prop and render published as No and render two tags', () => {
    const articleMock2 = {
      ...articleMock,
      tags: [
        {
          name: 'React',
        },
        {
          name: 'Testing',
        },
      ],
    };
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock2} />;
    const wrapper = shallow(node);
    const tags = wrapper.find(Tag);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe(published(articleMock));
    expect(tags.length).toBe(2);
    expect(tags.at(0).prop('name')).toBe(articleMock2.tags[0].name);
    expect(tags.at(1).prop('name')).toBe(articleMock2.tags[1].name);
  });

  it('should test mapStateToProps', () => {
    const mock = {
      article: {
        article: {},
      },
    };
    expect(mapStateToProps(mock)).toEqual({
      article: {},
    });
  });
});

