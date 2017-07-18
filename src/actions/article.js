import {
  request,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_DELETE_QUERY,
} from './../graphql';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

function setArticles({ articles }) {
  return {
    type: SET_ARTICLES,
    payload: articles,
  };
}

function setArticle({ articles }) {
  return {
    type: SET_ARTICLE,
    payload: articles,
  };
}

function removeArticle(index) {
  return {
    type: DELETE_ARTICLE,
    payload: {
      index,
    },
  };
}

export function getArticles() {
  return dispatch => {
    request(ARTICLES_QUERY).then(response => {
      dispatch(setArticles(response.data));
    });
  };
}

export function getArticle(id) {
  return dispatch => {
    request(ARTICLE_QUERY(id)).then(response => {
      dispatch(setArticle(response.data));
    });
  };
}

export function deleteArticle(article) {
  return (dispatch, getState) => {
    const state = getState();
    const index = state.article.articles.indexOf(article);
    request(ARTICLE_DELETE_QUERY(article)).then(() => {
      dispatch(removeArticle(index));
    });
  };
}
