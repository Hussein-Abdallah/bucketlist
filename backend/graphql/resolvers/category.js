const Category = require("../../models/categories");
const { transformCategory } = require("../../utilities/dataFormatters");

const categories = async (_, { userId }) => {
  const categories = await Category.find({ user: userId });
  return categories.map((category) => {
    return transformCategory(category);
  });
};

const category = async (_, { id }) => {
  const category = await Category.findById(id);
  return transformCategory(category);
};

const addCategory = async (_, { input }) => {
  const category = new Category({
    title: input.title,
    description: input.description,
    image: input.image,
    user: input.userId,
  });
  const result = await category.save();
  return transformCategory(result);
};

const updateCategory = async (_, { id, input }) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      title: input.title,
      description: input.description,
      image: input.image,
    },
    { new: true }
  );

  return transformCategory(updatedCategory);
};

const removeCategory = async (_, { id }) => {
  const category = await Category.findByIdAndRemove(id);
  return transformCategory(category);
};

module.exports = {
  Query: { categories, category },
  Mutation: { addCategory, updateCategory, removeCategory },
};
