const { gql } = require("apollo-server-express");
const {
  getAllProduct,
  getProductById,
} = require("../controllers/productController");

// Define Your Type Definitons
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    quantity: Float!
    description: String
  }
  type Query {
    hello: String!
    hii: String!
    products: [Product]
    product(id: ID): Product
  }
`;

// Define Your Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello world",
    hii: () => "How Are You...??",
    // products: () => "Product Array",
    products: getAllProduct,
    product: (_, { id }) => getProductById(id),
  },
};

module.exports = { typeDefs, resolvers };
