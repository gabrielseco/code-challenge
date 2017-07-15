// @flow
import { Article as IArticle } from './../types';
import { SET_ARTICLES, SET_ARTICLE } from './../actions';

export type State = {
  articles: IArticle[],
  article: IArticle
};

const initialState: State = {
  articles: [],
  article: [],
};

const article = (state: State = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    default:
      return state;
  }
};

export { article };
