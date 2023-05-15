import {Card} from 'react-bootstrap';
import classNames from 'classnames';
import {BsPlusCircle} from 'react-icons/bs';

import styles from './NewCategoryCard.module.css';

export function NewCategoryCard() {
  return (
    <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
      <Card
        className={classNames(
          styles.Card,
          styles.NewCard,
          'd-flex justify-content-center align-items-center',
        )}
      >
        <BsPlusCircle className={styles.PlusIcon} />
        <span className="mt-3">Add Category</span>
      </Card>
    </div>
  );
}
