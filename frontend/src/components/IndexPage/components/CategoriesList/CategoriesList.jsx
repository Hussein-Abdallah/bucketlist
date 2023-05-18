import {useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {loader} from 'graphql.macro';
import {useQuery} from '@apollo/client';

import styles from './CategoriesList.module.css';
import {CategoryCard, NewCategoryCard, CategoryModal} from './components';

const GetCategories = loader('./graphql/getCategories.graphql');

export function CategoriesList() {
  const {data, loading, error} = useQuery(GetCategories);
  const [categoryModal, setCategoryModal] = useState(null);
  const [category, setCategory] = useState(null);

  if (loading) {
    return (
      <div className={styles.SpinnerContainer}>
        <Spinner
          animation="border"
          variant="light"
          className={styles.Spinner}
        />
      </div>
    );
  }

  if (error) {
    return <div className={styles.ErrorContainer}>Error! {error.message}</div>;
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
