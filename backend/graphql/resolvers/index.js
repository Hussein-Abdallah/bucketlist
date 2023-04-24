const { mergeResolvers } = require("@graphql-tools/merge");
const userResolvers = require("./user");
const categoryResolvers = require("./category");

const resolvers = [userResolvers, categoryResolvers];

module.exports = mergeResolvers(resolvers);
