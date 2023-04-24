module.exports = `
  "User type"
  type User {
    id: ID!
    name: String!
    email: String!
    dateOfBirth: String!
    password: String!
  }

  "input type for user"
  input NewUserInput {
    name: String!
    email: String!
    dateOfBirth: String!
    password: String!
  }

  type Query {
    "Get all users"
    users: [User!]!
    "Get user by id"
    user(id: ID!): User!
  }

  type Mutation {
    "Add new user"
    addUser(input: NewUserInput!): User!
    "Remove user by id"
    removeUser(id: ID!): User!
  }
`;
