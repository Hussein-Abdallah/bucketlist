import {Spinner} from 'react-bootstrap';

import {loader} from 'graphql.macro';
import {useQuery} from '@apollo/client';

import styles from './CategoriesList.module.css';
import {CategoryCard, NewCategoryCard} from './components';

const GetCategories = loader('./graphql/getCategories.graphql');

export function CategoriesList() {
  const {data, loading, error} = useQuery(GetCategories);

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

  const {categories} = data;

  console.log('categories', categories);

  return (
    <div className="container pb-5">
      <div className="row">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <NewCategoryCard />
      </div>
    </div>
  );
}
