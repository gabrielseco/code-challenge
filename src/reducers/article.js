import { SET_ARTICLES, SET_ARTICLE, DELETE_ARTICLE } from './../actions';

const initialState = {
  articles: [],
  article: [],
};

const article = (state = initialState, action) => {
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
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles.slice(0, action.payload.index),
          ...state.articles.slice(action.payload.index + 1),
        ],
      };
    default:
      return state;
  }
};

export { article };
