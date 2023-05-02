const {Category} = require('../../models');
const {transformCategory} = require('../../utilities');

const categories = async (_source, _args, context) => {
  if (!context.isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const categoriesList = await Category.find({user: context.userId});
  return categoriesList.map((category) => {
    return transformCategory(category);
  });
};

const category = async (_source, {id}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const categoryDetails = await Category.findOne({_id: id, user: userId});
  return transformCategory(categoryDetails);
};

const addCategory = async (_source, {input}, context) => {
  if (!context.isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const newCategory = new Category({
    title: input.title,
    description: input.description,
    image: input.image,
    user: context.userId,
  });
  const result = await newCategory.save();
  return transformCategory(result);
};

const updateCategory = async (_, {id, input}, context) => {
  if (!context.isAuthenticated) {
    throw new Error('Unauthenticated');
  }

  const updateCategory = await Category.findOneAndUpdate(
    {_id: id, user: context.userId},
    {
      title: input.title,
      description: input.description,
      image: input.image,
    },
    {new: true},
  );

  if (!updateCategory) {
    throw new Error('Category not found');
  }

  return transformCategory(updateCategory);
};

const removeCategory = async (_source, {id}, context) => {
  const {userId, isAuthenticated} = context;
  if (!isAuthenticated) {
    throw new Error('Unauthorized');
  }

  const deletedCategory = await Category.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedCategory) {
    throw new Error('Category not found');
  }

  return transformCategory(deletedCategory);
};

module.exports = {
  Query: {categories, category},
  Mutation: {addCategory, updateCategory, removeCategory},
};
