const {User} = require("../../models");
const {dateToString} = require("../../utilities");

const addUser = async (parent, args) => {
  const user = new User({
    name: args.input.name,
    email: args.input.email,
    dateOfBirth: args.input.dateOfBirth,
    password: args.input.password,
  });
  const newUser = await user.save();
  return {
    ...newUser._doc,
    id: newUser._doc._id,
    dateOfBirth: dateToString(newUser._doc.dateOfBirth),
  };
};

const removeUser = async (parent, args) => {
  const deletedUser = await User.findByIdAndRemove(args.id);
  return deletedUser;
};

const users = async () => {
  const usersList = await User.find();
  return usersList.map((user) => {
    return {
      ...user._doc,
      id: user._doc._id,
      dateOfBirth: dateToString(user._doc.dateOfBirth),
    };
  });
};

const user = async (_, {id}) => {
  const userDetails = await User.findById(id);
  return {
    ...userDetails._doc,
    id: userDetails._doc._id,
    dateOfBirth: dateToString(userDetails._doc.dateOfBirth),
  };
};

module.exports = {Query: {users, user}, Mutation: {addUser, removeUser}};
