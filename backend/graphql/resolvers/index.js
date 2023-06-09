const {mergeResolvers} = require('@graphql-tools/merge');

const userResolvers = require('./user');
const categoryResolvers = require('./category');
const wishResolvers = require('./wish');

const resolvers = [userResolvers, categoryResolvers, wishResolvers];

module.exports = mergeResolvers(resolvers);
