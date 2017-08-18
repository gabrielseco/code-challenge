import {
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { findById } from './helpers';
import { ArticleType } from './types';
import db from './db';

const ArticlesQuery = {
  articles: {
    type: new GraphQLList(ArticleType),
    args: {
      id: { type: GraphQLString, description: 'Get article by Id' },
    },
    resolve(_, { id }) {
      return id ? findById(db, 'Article', id) : db.Article.find();
    },
  },
};

export {
  ArticlesQuery,
};

