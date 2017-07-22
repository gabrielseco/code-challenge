import React from 'react';
import { shallow } from 'enzyme';
import { DetailTesting, mapStateToProps } from './Detail';

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

describe('App suite', () => {
  it('renders App without any state injected', () => {
    const wrapper = shallow(<DetailTesting dispatch={dispatch} match={match} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').text()).toBe('Loading');
  });

  it('should inject article as prop and render published as NO', () => {
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock} />;
    const wrapper = shallow(node);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(articleMock.author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe('NO');
  });

  it('should inject article as prop and render published as YES', () => {
    const articleMock2 = {
      ...articleMock,
      published: true,
    };
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock2} />;
    const wrapper = shallow(node);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(articleMock.author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe('SÍ');
  });

  it('should inject article as prop and render published as NO and render two tags', () => {
    const articleMock2 = {
      ...articleMock,
      tags: [
        'React',
        'Testing',
      ],
    };
    const node = <DetailTesting dispatch={dispatch} match={match} article={articleMock2} />;
    const wrapper = shallow(node);
    const tags = wrapper.find('.detail .tags > p');

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.detail .title').text()).toBe(articleMock.title);
    expect(wrapper.find('.detail .author').text()).toBe(articleMock.author);
    expect(wrapper.find('.detail .content').text()).toBe(articleMock.content);
    expect(wrapper.find('.detail .published').text()).toBe('NO');
    expect(tags.length).toBe(2);
    expect(tags.at(0).text()).toBe(articleMock2.tags[0]);
    expect(tags.at(1).text()).toBe(articleMock2.tags[1]);
  });

  it('should test mapStateToProps', () => {
    const mock = {
      article: {
        article: [
          {},
        ],
      },
    };
    expect(mapStateToProps(mock)).toEqual({
      article: {},
    });
  });
});

