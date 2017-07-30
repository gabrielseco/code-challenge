import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import { ArticlesQuery } from './queries';
import { AddArticleMutation, DeleteArticleMutation } from './mutations';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    ...ArticlesQuery,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation',
  fields: () => ({
    ...AddArticleMutation,
    ...DeleteArticleMutation,
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
