import {
  request,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_FULL_FIELDS,
  ARTICLE_DELETE_QUERY,
  ARTICLE_CREATE_QUERY,
  ARTICLE_EDIT_QUERY,
} from './../graphql';

import Shared from './../shared';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DISABLE_MUTATION = 'DISABLE_MUTATION';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';

const formatTag = tag => ({
  name: tag,
  color: Shared.getColor(),
});

function formatArticle(article) {
  const tags = article.tags.map(tag => formatTag(tag));
  return {
    ...article,
    tags,
  };
}

function setData(type, articles) {
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

function editArticleToStore(article) {
  return {
    type: EDIT_ARTICLE,
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
      dispatch(setData(SET_ARTICLES, response.data.articles));
    });
  };
}

export function getArticle(id) {
  return dispatch => {
    return request(ARTICLE_QUERY(id)).then(response => {
      const article = formatArticle(response.data.articles[0]);
      dispatch(setData(SET_ARTICLE, article));
    });
  };
}

export function getArticleEdition(id) {
  return dispatch => {
    return request(ARTICLE_FULL_FIELDS(id)).then(response => {
      const article = formatArticle(response.data.articles[0]);
      dispatch(setData(SET_ARTICLE, article));
    });
  };
}

export function addArticle(article) {
  const { id, ...rest } = article;
  const articleToAdd = {
    ...rest,
    content: article.content.trim(),
    excerpt: article.excerpt.trim(),
    tags: article.tags.map(tag => tag.name),
  };

  const query = ARTICLE_CREATE_QUERY(articleToAdd);

  return dispatch => {
    return request(query).then(response => {
      dispatch(addArticleToStore(response.data.createArticle));
      setTimeout(() => {
        dispatch(disableArticleMutation());
      }, 500);
    });
  };
}

export function editArticle(article) {
  const articleToEdit = {
    ...article,
    content: article.content.trim(),
    excerpt: article.excerpt.trim(),
    tags: article.tags.map(tag => tag.name),
  };

  const query = ARTICLE_EDIT_QUERY(articleToEdit);

  return dispatch => {
    return request(query).then(response => {
      dispatch(editArticleToStore(response.data.updateArticle));
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
