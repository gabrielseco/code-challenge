import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { ArticleType, ArticleInputType } from './types';
import db from './db';
import { save, remove } from './helpers';

const DeleteArticleMutation = {
  deleteArticle: {
    type: ArticleType,
    description: 'Delete an article with id and return the article that was deleted.',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (value, { id }) => {
      return remove(db, 'Article', id);
    },
  },
};

const AddArticleMutation = {
  createArticle: {
    type: ArticleType,
    description: 'Create a new article',
    args: {
      article: { type: ArticleInputType },
    },
    resolve: (value, { article }) => {
      return save(db, 'Article', article);
    },
  },
};

export {
  AddArticleMutation, DeleteArticleMutation,
};
