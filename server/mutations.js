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
    resolve: (value, { article }) => {
      const newArticle = Object.assign({}, article, {
        tags: article.tags ? article.tags[0].split(',') : [],
      });
      return save(db, 'Article', newArticle);
    },
  },
};

export {
  AddArticleMutation,
  DeleteArticleMutation,
};
