module.exports = `
  enum Status {
    New
    Planning
    In progress
    Achieved
  }

  type Wish {
    id: ID!
    title: String!
    location: String
    description: String
    status: String!
    timeline: String
    cost: Float
    user: User!
    category: Category!
    createdAt: String!
    updatedAt: String!
  }

  input WishInput {
    title: String!
    location: String
    description: String
    image: String
    timeline: String
    cost: Float
    user: ID!
    category: ID!
  }

  input WishUpdateInput {
    title: String
    location: String
    image: String
    description: String
    status: Status
    timeline: String
    cost: Float
  }

  type Query {
    wishes(category: ID!, user: ID!): [Wish!]!
    wish(id: ID!): Wish!
  }

  type Mutation {
    createWish(input: WishInput!): Wish!
    updateWish(id: ID!, input: WishUpdateInput!): Wish!
    deleteWish(id: ID!): Wish!
  }
`;
