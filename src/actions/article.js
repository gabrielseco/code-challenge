import {
  request,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_DELETE_QUERY,
} from './../graphql';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

function setData(type, { articles }) {
  return {
    type,
    payload: articles,
  };
}

function removeArticle(index) {
  return {
    type: DELETE_ARTICLE,
    payload: index,
  };
}

export function getArticles() {
  return dispatch => {
    return request(ARTICLES_QUERY).then(response => {
      dispatch(setData(SET_ARTICLES, response.data));
    });
  };
}

export function getArticle(id) {
  return dispatch => {
    return request(ARTICLE_QUERY(id)).then(response => {
      dispatch(setData(SET_ARTICLE, response.data));
    });
  };
}

export function deleteArticle(article) {
  return (dispatch, getState) => {
    const state = getState();
    const index = state.article.articles.indexOf(article);
    return request(ARTICLE_DELETE_QUERY(article.id)).then(() => {
      dispatch(removeArticle(index));
    });
  };
}
