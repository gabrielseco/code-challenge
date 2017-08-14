import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import {
  getArticles,
  getArticle,
  getArticleEdition,
  deleteArticle,
  SET_ARTICLES,
  SET_ARTICLE,
  DELETE_ARTICLE,
} from './article';
import { ARTICLES_QUERY, ARTICLE_QUERY, ARTICLE_FULL_FIELDS, ARTICLE_DELETE_QUERY } from './../graphql';
import articleFake from './article.fake.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const host = 'http://localhost:4000';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const article = {
  id: '5974452d72f1dc0938a2109f',
};

const createStore = () => ({
  article: {
    articles: [
      article,
    ],
    article: [],
  },
});

describe('article actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SET_ARTICLES when fetching articles has been done', () => {
    nock(host)
      .post('/graphql', { query: ARTICLES_QUERY })
      .reply(200, articleFake);

    const expectedActions = [
      { type: SET_ARTICLES, payload: articleFake.data.articles },
    ];
    const store = mockStore(createStore);
    return store.dispatch(getArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_ARTICLE when fetching article has been done', () => {
    nock(host)
      .post('/graphql', { query: ARTICLE_QUERY('5974452d72f1dc0938a2109f') })
      .reply(200, articleFake);

    const expectedActions = [
      { type: SET_ARTICLE, payload: articleFake.data.articles[0] },
    ];
    const store = mockStore(createStore);
    return store.dispatch(getArticle('5974452d72f1dc0938a2109f')).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(expectedActions[0].type);
      expect(actions[0].payload.title).toBe(expectedActions[0].payload.title);
      expect(actions[0].payload.tags[0].name).toBe(expectedActions[0].payload.tags[0]);
    });
  });

  it('creates SET_ARTICLE when fetching article for edition has been done', () => {
    nock(host)
      .post('/graphql', { query: ARTICLE_FULL_FIELDS('5974452d72f1dc0938a2109f') })
      .reply(200, articleFake);

    const expectedActions = [
      { type: SET_ARTICLE, payload: articleFake.data.articles[0] },
    ];
    const store = mockStore(createStore);
    return store.dispatch(getArticleEdition('5974452d72f1dc0938a2109f')).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(expectedActions[0].type);
      expect(actions[0].payload.title).toBe(expectedActions[0].payload.title);
      expect(actions[0].payload.tags[0].name).toBe(expectedActions[0].payload.tags[0]);
    });
  });

  it('creates DELETE_ARTICLE when deleting has been done', () => {
    nock(host)
      .post('/graphql', { query: ARTICLE_DELETE_QUERY('5974452d72f1dc0938a2109f') })
      .reply(200, articleFake);

    const expectedActions = [
      { type: DELETE_ARTICLE, payload: 0 },
    ];
    const store = mockStore(createStore);
    return store.dispatch(deleteArticle(article)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

