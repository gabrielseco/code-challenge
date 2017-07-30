import {
  request,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_DELETE_QUERY,
  ARTICLE_CREATE_QUERY,
} from './../graphql';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DISABLE_MUTATION = 'DISABLE_MUTATION';

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

function addArticleToStore(article) {
  return {
    type: ADD_ARTICLE,
    payload: article,
  };
}

function disableArticleMutation() {
  return {
    type: DISABLE_MUTATION,
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

export function addArticle(article) {
  const articleToAdd = {
    ...article,
    tags: article.tags.map(tag => tag.name),
  };

  return dispatch => {
    return request(ARTICLE_CREATE_QUERY(articleToAdd)).then(response => {
      dispatch(addArticleToStore(response.data.createArticle));
      setTimeout(() => {
        dispatch(disableArticleMutation());
      }, 500);
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
