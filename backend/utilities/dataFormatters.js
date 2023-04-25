const {User} = require("../models");
const {Category} = require("../models");

const {dateToString} = require("./date");

const populateUser = async (userId) => {
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
    user: populateUser(category.user),
  };
};

const populateCategory = async (categoryId) => {
  const categoryDetails = await Category.findById(categoryId);
  return transformCategory(categoryDetails);
};

const transformWish = (wish) => {
  return {
    ...wish._doc,
    id: wish._doc._id,
    timeline: dateToString(wish._doc.timeline),
    user: populateUser(wish._doc.user),
    category: populateCategory(wish._doc.category),
  };
};

module.exports = {
  populateUser,
  transformCategory,
  populateCategory,
  transformWish,
};
