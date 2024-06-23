const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const connectToMongoDB = require("./database/connection");

async function startServer() {
  connectToMongoDB();
  // Create an instance of ApolloServer
  const server = new ApolloServer({ typeDefs, resolvers });

  // Initialize an Express application
  const app = express();

  // Apply Apollo GraphQL middleware and set the path to /graphql
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  // Define a port
  const PORT = process.env.PORT || 4000;

  // Start the Express server
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
