import { article as reducer, initialState } from './article';
import {
  SET_ARTICLES,
  SET_ARTICLE,
  DELETE_ARTICLE,
  DISABLE_MUTATION,
  ENABLE_MUTATION,
} from '../actions/article';

describe('Article reducer', () => {
  const article = {
    id: '1234',
    title: 'A test title',
    author: 'Avicii',
  };

  it('should SET_ARTICLES', () => {
    const action = {
      type: SET_ARTICLES,
      payload: [article],
    };
    const result = reducer(initialState, action);

    expect(result.articles).toEqual([article]);
    expect(result.article).toBeNull();
  });

  it('should SET_ARTICLE', () => {
    const action = {
      type: SET_ARTICLE,
      payload: article,
    };
    const result = reducer(initialState, action);

    expect(result.articles).toEqual([]);
    expect(result.article).toEqual(article);
  });

  it('should DELETE_ARTICLE', () => {
    const mockState = {
      articles: [article, {}],
      article: [],
    };
    const action = {
      type: DELETE_ARTICLE,
      payload: 0,
    };
    const result = reducer(mockState, action);

    expect(result.articles.length).toBe(1);
  });

  it('should DISABLE_MUTATION', () => {
    const mockState = {
      articles: [article],
      article: [],
      mutationArticle: true,
    };
    const action = {
      type: DISABLE_MUTATION,
    };
    const result = reducer(mockState, action);

    expect(result.articles.length).toBe(1);
    expect(result.articleMutation).toBeFalsy();
  });

  it('should ENABLE_MUTATION', () => {
    const mockState = {
      articles: [article],
      article: [],
      mutationArticle: false,
    };
    const action = {
      type: ENABLE_MUTATION,
    };
    const result = reducer(mockState, action);

    expect(result.articles.length).toBe(1);
    expect(result.articleMutation).toBeTruthy();
  });

  it('should go to defaultState', () => {
    const result = reducer(undefined, { type: 'any' });
    expect(result.articles).toEqual([]);
    expect(result.article).toBeNull();
    expect(article.articleMutation).toBeFalsy();
  });
});
