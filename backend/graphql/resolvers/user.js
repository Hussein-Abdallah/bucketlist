const User = require("../../models/users");
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
  return usersList;
};

const user = async (_, {id}) => {
  const userItem = await User.findById(id);
  return userItem;
};

module.exports = {Query: {users, user}, Mutation: {addUser, removeUser}};
