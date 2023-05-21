module.exports = `
  type Category {
    id: ID!
    title: String!
    description: String
    image: String
    user: User!
    wishes: [Wish!]
    totalWishes: Int
    completedWishes: Int
  }

  input CategoryInput {
    title: String!
    description: String
    image: String
  }

  input CategoryUpdateInput {
    title: String
    description: String
    image: String
  }

  type Query {
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: CategoryInput): Category
    updateCategory(id: ID!, input: CategoryUpdateInput): Category
    removeCategory(id: ID!): Category
  }
`;
