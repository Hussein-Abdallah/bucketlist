const User = require("../models/users");
const { dateToString } = require("./date");

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._doc._id,
      dateOfBirth: dateToString(user._doc.dateOfBirth),
    };
  } catch (err) {
    throw err;
  }
};

const transformCategory = (category) => {
  return {
    ...category._doc,
    id: category._doc._id,
    user: user.bind(this, category.user),
  };
};

exports.userDetails = user;
exports.transformCategory = transformCategory;
