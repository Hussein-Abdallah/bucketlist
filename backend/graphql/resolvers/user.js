const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {User} = require("../../models");

const createUser = async (_parent, args) => {
  const existingUser = await User.findOne({email: args.input.email});

  if (existingUser) {
    throw new Error("User exists already.");
  }

  const hashedPassword = await bcrypt.hash(args.input.password, 12);

  const user = new User({
    name: args.input.name,
    email: args.input.email,
    password: hashedPassword,
    dateOfBirth: args.input.dateOfBirth,
  });
  const newUser = await user.save();

  const token = jwt.sign(
    {userId: newUser.id, email: newUser.email},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  return {
    userId: newUser.id,
    token,
    tokenExpiration: 1,
  };
};

const deleteUser = async (_parent, args, context) => {
  const {isAuthenticated, userId} = context;
  if (!isAuthenticated) {
    throw new Error("Unauthenticated");
  }

  const deletedUser = await User.findByIdAndRemove(userId);
  return deletedUser;
};

const login = async (_, {email, password}) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error("Credentials are incorrect!");
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    throw new Error("pass are incorrect!");
  }

  const token = jwt.sign(
    {userId: user.id, email: user.email},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  return {
    userId: user.id,
    token,
    tokenExpiration: 1,
  };
};

module.exports = {
  Query: {login},
  Mutation: {createUser, deleteUser},
};
