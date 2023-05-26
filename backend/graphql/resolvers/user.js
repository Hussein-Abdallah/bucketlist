const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {User} = require('../../models');

const login = async (_, {email, password}, context) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('Credentials are incorrect!');
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    throw new Error('Credentials are incorrect!');
  }

  const token = jwt.sign(
    {userId: user.id, email: user.email},
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '30d',
    },
  );

  context.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return {
    userId: user.id,
    token,
    tokenExpiration: 30,
  };
};

const createUser = async (_parent, args, context) => {
  const existingUser = await User.findOne({email: args.input.email});

  if (existingUser) {
    throw new Error('User exists already.');
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
      expiresIn: '1h',
    },
  );

  context.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return {
    userId: newUser.id,
    token,
    tokenExpiration: 1,
  };
};

const updateUser = async (_, {input}, context) => {
  const {isAuthenticated, userId} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const updatedUser = await User.findOneAndUpdate(
    {_id: userId},
    {
      name: input.name,
      email: input.email,
      dateOfBirth: input.dateOfBirth,
      avatar: input.avatar,
    },
    {new: true},
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};

const updateUserPassword = async (_, {password}, context) => {
  const {isAuthenticated, userId} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const user = await User.findOne({_id: userId});
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordEqual = await bcrypt.compare(password, user._doc.password);
  if (isPasswordEqual) {
    throw new Error('New password must be different from old password');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;

  try {
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error('Something went wrong updating password');
  }
};

const deleteUser = async (_parent, args, context) => {
  const {isAuthenticated, userId} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }
  const deletedUser = await User.findByIdAndRemove(userId);

  if (!deletedUser) {
    throw new Error('User not found');
  }

  return deletedUser;
};

module.exports = {
  Query: {login},
  Mutation: {
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser,
  },
};
