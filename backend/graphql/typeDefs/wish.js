module.exports = `

  type Wish {
    id: ID!
    title: String!
    location: String
    description: String
    status: Boolean!
    timeline: String
    image: String
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
    category: ID!
  }

  input WishUpdateInput {
    title: String
    location: String
    image: String
    description: String
    status: Boolean
    timeline: String
    cost: Float
  }

  type Query {
    wishes(category: ID!): [Wish!]!
    wish(id: ID!): Wish!
  }

  type Mutation {
    createWish(input: WishInput!): Wish!
    updateWish(id: ID!, input: WishUpdateInput!): Wish!
    deleteWish(id: ID!): Wish!
  }
`;
