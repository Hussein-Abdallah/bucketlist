module.exports = `
  type Category {
    id: ID!
    title: String!
    description: String
    image: String
    user: User!
  }

  input CategoryInput {
    title: String!
    description: String
    image: String
    userId: ID!
  }

  input CategoryUpdateInput {
    title: String
    description: String
    image: String
  }

  type Query {
    categories(userId: ID!): [Category]
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: CategoryInput): Category
    updateCategory(id: ID!, input: CategoryUpdateInput): Category
    removeCategory(id: ID!): Category
  }
`;
