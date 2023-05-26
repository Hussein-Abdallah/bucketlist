import {useState} from 'react';

import {useQuery} from '@apollo/client';

import {CategoryCard, NewCategoryCard, CategoryModal} from './components';
import {ErrorContainer, LoadingSpinner} from 'components/Shared';
import {GET_CATEGORIES} from './graphql/GetCategories';

export function CategoriesList() {
  const {data, loading, error} = useQuery(GET_CATEGORIES);
  const [categoryModal, setCategoryModal] = useState(null);
  const [category, setCategory] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  return (
    <>
      <div className="container pb-5">
        <div className="row">
          {data.categories &&
            data.categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                setCategoryModal={setCategoryModal}
                setCategory={setCategory}
              />
            ))}
          <NewCategoryCard setCategoryModal={setCategoryModal} />
        </div>
      </div>
      <CategoryModal
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
}
