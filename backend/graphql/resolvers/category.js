const {Category} = require("../../models");
const {transformCategory} = require("../../utilities");

const categories = async (_, {userId}) => {
  const categoriesList = await Category.find({user: userId});
  return categoriesList.map((category) => {
    return transformCategory(category);
  });
};

const category = async (_, {id}) => {
  const categoryDetails = await Category.findById(id);
  return transformCategory(categoryDetails);
};

const addCategory = async (_, {input}) => {
  const newCategory = new Category({
    title: input.title,
    description: input.description,
    image: input.image,
    user: input.userId,
  });
  const result = await newCategory.save();
  return transformCategory(result);
};

const updateCategory = async (_, {id, input}) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      title: input.title,
      description: input.description,
      image: input.image,
    },
    {new: true},
  );

  return transformCategory(updatedCategory);
};

const removeCategory = async (_, {id}) => {
  const deletedCategory = await Category.findByIdAndRemove(id);
  return transformCategory(deletedCategory);
};

module.exports = {
  Query: {categories, category},
  Mutation: {addCategory, updateCategory, removeCategory},
};
