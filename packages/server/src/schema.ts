import { makeExecutableSchema } from 'graphql-tools';
// import { makeExecutableSchema } from 'apollo-server-express';


import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';

const executableSchema = makeExecutableSchema({
  typeDefs,
  // tslint:disable-next-line
  resolvers
});

export default executableSchema;
