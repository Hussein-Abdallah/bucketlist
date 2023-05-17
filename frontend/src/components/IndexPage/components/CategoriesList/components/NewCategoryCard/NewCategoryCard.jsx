import {Card} from 'react-bootstrap';
import classNames from 'classnames';
import {BsPlusCircle} from 'react-icons/bs';

import styles from './NewCategoryCard.module.css';
import {CategoryModal} from '../CategoryModal';

export function NewCategoryCard({categoryModal, setCategoryModal}) {
  return (
    <>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
        <Card
          className={classNames(
            styles.Card,
            styles.NewCard,
            'd-flex justify-content-center align-items-center',
          )}
          onClick={() => setCategoryModal('NEW_CATEGORY')}
        >
          <BsPlusCircle className={styles.PlusIcon} />
          <span className="mt-3">Add Category</span>
        </Card>
      </div>
      <CategoryModal
        CategoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
      />
    </>
  );
}
