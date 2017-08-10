import React from 'react';
import { shallow } from 'enzyme';
import { AddArticleTesting, mapStateToProps } from './AddArticle';

const dispatch = jest.fn();
describe('AddArticle suite', () => {
  it('renders AddArticle without any state injected', () => {
    const wrapper = shallow(<AddArticleTesting dispatch={dispatch} />);

    expect(wrapper).toBeDefined();
  });

  it('should test the onSubmit event', () => {
    const wrapper = shallow(
      <AddArticleTesting dispatch={dispatch} />,
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
      <AddArticleTesting
        dispatch={dispatch}
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
      <AddArticleTesting
        dispatch={dispatch}
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
      },
    };
    expect(mapStateToProps(mock)).toEqual({
      articleMutation: false,
    });
  });
});
