const {mergeTypeDefs} = require('@graphql-tools/merge');

const userType = require('./user');
const categoryType = require('./category');
const wishType = require('./wish');

const types = [userType, categoryType, wishType];

module.exports = mergeTypeDefs(types);
