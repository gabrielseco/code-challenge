import { request, ARTICLES_QUERY, ARTICLE_QUERY } from './../graphql';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';

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
