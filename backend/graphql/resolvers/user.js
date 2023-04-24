const User = require("../../models/users");

const addUser = (parent, args) => {
  let user = new User({
    name: args.input.name,
    email: args.input.email,
    dateOfBirth: args.input.dateOfBirth,
    password: args.input.password,
  });
  return user.save();
};

const removeUser = async (parent, args) => {
  const deletedUser = await User.findByIdAndRemove(args.id);
  return deletedUser;
};

const users = async () => {
  const users = await User.find();
  return users;
};

const user = async (_, { id }) => {
  const user = await User.findById(id);
  return user;
};

module.exports = { Query: { users, user }, Mutation: { addUser, removeUser } };
