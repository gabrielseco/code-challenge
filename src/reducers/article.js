import {
  SET_ARTICLES,
  SET_ARTICLE,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  DISABLE_MUTATION,
  EDIT_ARTICLE,
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
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
        articleMutation: true,
      };
    case EDIT_ARTICLE:
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
