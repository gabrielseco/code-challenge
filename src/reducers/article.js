import {
  SET_ARTICLES,
  SET_ARTICLE,
  DELETE_ARTICLE,
  ENABLE_MUTATION,
  DISABLE_MUTATION,
} from './../actions';

export const initialState = {
  articles: [],
  article: null,
  articleMutation: false,
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
          ...state.articles.slice(0, action.payload),
          ...state.articles.slice(action.payload + 1),
        ],
      };
    case ENABLE_MUTATION:
      return {
        ...state,
        articleMutation: true,
      };
    case DISABLE_MUTATION:
      return {
        ...state,
        articleMutation: false,
      };
    default:
      return state;
  }
};

export { article };
