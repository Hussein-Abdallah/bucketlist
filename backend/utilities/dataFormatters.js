const {User} = require("../models");

const {dateToString} = require("./date");

const transformUser = async (userId) => {
  const userDetails = await User.findById(userId);
  return {
    ...userDetails._doc,
    id: userDetails._doc._id,
    dateOfBirth: dateToString(userDetails._doc.dateOfBirth),
  };
};

const transformCategory = (category) => {
  return {
    ...category._doc,
    id: category._doc._id,
    user: transformUser(category.user),
  };
};

module.exports = {transformUser, transformCategory};
