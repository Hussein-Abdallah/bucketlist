const { mergeTypeDefs } = require("@graphql-tools/merge");
const userType = require("./user");
const categoryType = require("./category");

const types = [userType, categoryType];

module.exports = mergeTypeDefs(types);
