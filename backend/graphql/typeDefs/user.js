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

  "Auth data type"
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    "Login user"
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    "Add new user"
    createUser(input: NewUserInput!): AuthData!
    "Remove user"
    deleteUser: User!
  }
`;
