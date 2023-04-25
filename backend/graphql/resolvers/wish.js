const {Wish} = require("../../models");
const {transformWish} = require("../../utilities");

const wish = async (_, {id}) => {
  const wishDetails = await Wish.findById(id);
  return transformWish(wishDetails);
};

const wishes = async (_, {category, user}) => {
  const wishesList = await Wish.find({category, user});
  return wishesList.map((wishItem) => {
    return transformWish(wishItem);
  });
};

const createWish = async (_, {input}) => {
  const newWish = new Wish({
    title: input.title,
    location: input.location,
    description: input.description,
    image: input.image,
    timeline: input.timeline,
    cost: input.cost,
    user: input.user,
    category: input.category,
  });

  const result = await newWish.save();
  return transformWish(result);
};

const updateWish = async (_, {id, input}) => {
  const updatedWish = await Wish.findByIdAndUpdate(
    id,
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

  return transformWish(updatedWish);
};

const deleteWish = async (_, {id}) => {
  const deletedWish = await Wish.findByIdAndRemove(id);
  return transformWish(deletedWish);
};

module.exports = {
  Query: {wish, wishes},
  Mutation: {createWish, updateWish, deleteWish},
};
