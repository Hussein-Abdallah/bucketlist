import classNames from 'classnames';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {loader} from 'graphql.macro';

import {ErrorContainer, LoadingSpinner} from 'components/Shared';
import {CategoryDetails, WishesList} from './components';

import styles from './Category.module.css';

const GET_CATEGORY = loader('./graphql/getCategory.graphql');

export function Category() {
  const {id} = useParams();

  const {loading, error, data} = useQuery(GET_CATEGORY, {
    variables: {id: id},
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  const {
    category: {title, description, image, wishes, totalWishes, completedWishes},
  } = data;

  return (
    <div className={classNames(styles.Container, 'container rounded')}>
      <div className="row">
        <CategoryDetails
          title={title}
          description={description}
          image={image}
        />
        <WishesList
          wishes={wishes}
          totalWishes={totalWishes}
          completedWishes={completedWishes}
        />
      </div>
    </div>
  );
}
