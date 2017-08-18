import React from 'react';
import { shallow } from 'enzyme';
import { EditArticleTesting, mapStateToProps } from './EditArticle';

const dispatch = jest.fn();
const match = {
  params: {
    id: 'XXX04043',
  },
};
describe('Edit Article suite', () => {
  it('renders EditArticle without any state injected', () => {
    const wrapper = shallow(<EditArticleTesting dispatch={dispatch} match={match} />);

    expect(wrapper).toBeDefined();
  });

  it('should test the onSubmit event', () => {
    const wrapper = shallow(
      <EditArticleTesting dispatch={dispatch} match={match} />,
    );

    expect(wrapper).toBeDefined();

    wrapper.instance().onSubmit({
      content: 'Prueba',
      excerpt: 'Prueba',
      tags: [],
    });

    expect(dispatch).toHaveBeenCalled();
  });

  it('should test the componentWillUpdate event when the article mutation is truthy', () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = shallow(
      <EditArticleTesting
        dispatch={dispatch}
        match={match}
      />,
    );

    expect(wrapper).toBeDefined();
    wrapper.instance().componentWillUpdate({
      articleMutation: true,
      history,
    });
    expect(history.push).toHaveBeenCalled();
  });

  it('should test the componentWillUpdate event when the article mutation is falsy', () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = shallow(
      <EditArticleTesting
        dispatch={dispatch}
        match={match}
      />,
    );

    expect(wrapper).toBeDefined();
    wrapper.instance().componentWillUpdate({
      articleMutation: false,
      history,
    });
    expect(history.push).not.toHaveBeenCalled();
  });


  it('should test mapStateToProps', () => {
    const mock = {
      article: {
        articleMutation: false,
        article: {
          title: 'A title',
        },
      },
    };
    expect(mapStateToProps(mock)).toEqual({
      articleMutation: mock.article.articleMutation,
      article: mock.article.article,
    });
  });
});
