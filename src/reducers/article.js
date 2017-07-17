import { SET_ARTICLES, SET_ARTICLE } from './../actions';

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
    default:
      return state;
  }
};

export { article };
