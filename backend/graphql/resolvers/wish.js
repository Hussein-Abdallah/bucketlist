const {Wish} = require('../../models');
const {transformWish} = require('../../utilities');

const wish = async (_source, {id}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const wishDetails = await Wish.findOne({_id: id, user: userId});
  if (!wishDetails) {
    throw new Error('Wish not found');
  }

  return transformWish(wishDetails);
};

const wishes = async (_source, {category}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const wishesList = await Wish.find({category, user: userId});
  return wishesList.map((wishItem) => {
    return transformWish(wishItem);
  });
};

const createWish = async (_source, {input}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const newWish = new Wish({
    title: input.title,
    location: input.location,
    description: input.description,
    image: input.image,
    timeline: input.timeline,
    cost: input.cost,
    user: userId,
    category: input.category,
  });

  const result = await newWish.save();
  return transformWish(result);
};

const updateWish = async (_source, {id, input}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const updatedWish = await Wish.findOneAndUpdate(
    {_id: id, user: userId},
    {
      title: input.title,
      location: input.location,
      description: input.description,
      image: input.image,
      status: input.status,
      timeline: input.timeline,
      cost: input.cost,
    },
    {new: true},
  );

  if (!updatedWish) {
    throw new Error('Wish not found');
  }

  return transformWish(updatedWish);
};

const deleteWish = async (_source, {id}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const deletedWish = await Wish.findOneAndDelete({_id: id, user: userId});

  if (!deletedWish) {
    throw new Error('Wish not found');
  }

  return transformWish(deletedWish);
};

module.exports = {
  Query: {wish, wishes},
  Mutation: {createWish, updateWish, deleteWish},
};
