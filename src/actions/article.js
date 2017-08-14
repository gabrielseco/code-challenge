import {
  request,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_FULL_FIELDS,
  ARTICLE_DELETE_QUERY,
  ARTICLE_CREATE_QUERY,
  ARTICLE_EDIT_QUERY,
} from './../graphql';

import shared from './../shared';

export const SET_ARTICLES = 'SET_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ENABLE_MUTATION = 'ENABLE_MUTATION';
export const DISABLE_MUTATION = 'DISABLE_MUTATION';

const formatTag = tag => ({
  name: tag,
  color: shared.getColor(),
});

function formatArticle(article) {
  const tags = article.tags.map(tag => formatTag(tag));
  return {
    ...article,
    tags,
  };
}

function formatArticleGraphQL(article) {
  return {
    ...article,
    content: article.content.trim(),
    excerpt: article.excerpt.trim(),
    tags: article.tags.map(tag => tag.name),
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

function enableMutation() {
  return {
    type: ENABLE_MUTATION,
  };
}

function disableMutation() {
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
  const articleToAdd = formatArticleGraphQL({ ...rest });

  const query = ARTICLE_CREATE_QUERY(articleToAdd);

  return dispatch => {
    return request(query).then(() => {
      dispatch(enableMutation());
      setTimeout(() => {
        dispatch(disableMutation());
      }, 500);
    });
  };
}

export function editArticle(article) {
  const articleToEdit = formatArticleGraphQL(article);

  const query = ARTICLE_EDIT_QUERY(articleToEdit);

  return dispatch => {
    return request(query).then(() => {
      dispatch(enableMutation());
      setTimeout(() => {
        dispatch(disableMutation());
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
