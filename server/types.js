import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'This represents a Article',
  fields: () => ({
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    excerpt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    excerpt: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    published: { type: new GraphQLNonNull(GraphQLBoolean) },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

const ArticleInputAttributesType = new GraphQLInputObjectType({
  name: 'ArticleInputAttributesType',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    excerpt: { type: GraphQLString },
    content: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

export {
  ArticleType,
  ArticleInputType,
  ArticleInputAttributesType,
};
