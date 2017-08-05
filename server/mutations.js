import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { ArticleType, ArticleInputType, ArticleInputAttributesType } from './types';
import db from './db';
import { save, remove, update } from './helpers';

// TODO: When I send an array by template string it concatenates with commas due to toString() method
// When it comes here I get an array length = 1 concatenated with commas
// Get the first position and do an split until I discover a better way to do it.

const AddArticleMutation = {
  createArticle: {
    type: ArticleType,
    description: 'Create a new article',
    args: {
      article: { type: ArticleInputType },
    },
    resolve: async (value, { article }) => {
      const newArticle = Object.assign({}, article, {
        tags: article.tags ? article.tags[0].split(',') : [],
      });
      return await save(db, 'Article', newArticle);
    },
  },
};

const DeleteArticleMutation = {
  deleteArticle: {
    type: ArticleType,
    description: 'Delete an article with id and return the article that was deleted.',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (value, { id }) => {
      return await remove(db, 'Article', id);
    },
  },
};

const EditArticleMutation = {
  updateArticle: {
    type: ArticleType,
    description: 'Update an article',
    args: {
      article: { type: ArticleInputAttributesType },
    },
    resolve: async (value, { article }) => {
      const newArticle = Object.assign({}, article, {
        tags: article.tags ? article.tags[0].split(',') : [],
      });
      return await update(db, 'Article', newArticle);
    },
  },
};

export {
  AddArticleMutation,
  DeleteArticleMutation,
  EditArticleMutation,
};
