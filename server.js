import { ApolloServer, gql } from "apollo-server";

//const typeDefs = gql`(Schema Definition Language)`
//type Query is required.

//type Query, same as Get requests(URL) of REST API
//type Mutation,same as POST/PATCH/DELETE requests(URL) of REST API
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;
//Graphql needs to know shape of your data(typeDefs) in advance
const server = new ApolloServer({ typeDefs });
server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
