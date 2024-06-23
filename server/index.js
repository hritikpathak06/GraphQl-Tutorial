const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const connectToMongoDB = require("./database/connection");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

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

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Routes
  app.use("/api/v1/product", productRoutes);
  app.use("/api/v1/user", userRoutes);

  // Start the Express server
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
