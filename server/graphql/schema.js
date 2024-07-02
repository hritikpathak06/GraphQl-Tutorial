const { gql } = require("apollo-server-express");
const {
  getAllProduct,
  getProductById,
} = require("../controllers/productController");
const {
  getAllLectures,
  getSingleLecture,
  getLectureByUser,
} = require("../controllers/LectureController");
const User = require("../models/userModel");
const { createUserByGraphql } = require("../controllers/userController");

// Define Your Type Definitons
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    email: String!
    lastName: String!
    lectures: [Lecture]
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    quantity: Float!
    description: String
    createdBy: User
  }

  type Lecture {
    id: ID!
    title: String!
    description: String!
    position: Float!
    videoUrl: String!
    duration: Float!
    isPublished: Float!
    isPreview: Float!
    createdBy: User
  }

  type Query {
    hello: String!
    hii: String!
    products: [Product]
    product(id: ID): Product
    lectures: [Lecture]
    lecture(id: ID): Lecture
    users: [User]
    userLecture(id: ID): Lecture
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
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
    lectures: getAllLectures,
    lecture: (_, { id }) => getSingleLecture(id),
    userLecture: (_, { id }) => getLectureByUser(id),
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: (_, { firstName, lastName, email, password }) =>
      createUserByGraphql(firstName, lastName, email, password),
  },
};

module.exports = { typeDefs, resolvers };
