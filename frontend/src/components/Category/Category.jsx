import classNames from 'classnames';
import {useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {BsArrowBarLeft as BackIcon} from 'react-icons/bs';

import {ErrorContainer, LoadingSpinner} from 'components/Shared';
import {CategoryDetails, WishesList} from './components';
import {GET_CATEGORY} from './graphql/GetCategory';
import styles from './Category.module.css';

export function Category() {
  const {id} = useParams();
  const navigate = useNavigate();

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
        <div className={styles.BackButton} onClick={() => navigate(-1)}>
          <BackIcon />
          Back to Categories
        </div>
      </div>
      <div className="row">
        <CategoryDetails
          title={title}
          description={description}
          image={image}
        />
        <WishesList
          categoryId={id}
          wishes={wishes}
          totalWishes={totalWishes}
          completedWishes={completedWishes}
        />
      </div>
    </div>
  );
}
