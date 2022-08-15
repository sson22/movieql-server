import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first one!",
  },
  {
    id: "2",
    text: "second one",
  },
];

let users = [
  {
    id: "1",
    firstName: "Mike",
    lastName: "Kim",
  },
  {
    id: "2",
    firstName: "Soph",
    lastName: "Son",
  },
];
//const typeDefs = gql`(Schema Definition Language)`
//type Query is required.

//type Query, same as Get requests(URL) of REST API
//type Mutation,same as POST/PATCH/DELETE requests(URL) of REST API
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
};
//Graphql needs to know shape of your data(typeDefs) in advance
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
