import {Card} from 'react-bootstrap';
import classNames from 'classnames';
import {BsArrowRightShort} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';

import styles from './CategoryCard.module.css';
import {getImageUrl} from 'foundation/utilities';
import {CATEGORY_MODAL} from '../../utilities';

export function CategoryCard({category, setCategoryModal, setCategory}) {
  const {title, description, image, totalWishes, completedWishes} = category;
  const imageUrl = getImageUrl(image);

  const handleEdit = () => {
    setCategoryModal(CATEGORY_MODAL.EDIT_CATEGORY);
    setCategory(category);
  };
  return (
    <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex position-relative">
      <Card
        className={classNames(styles.Card)}
        onClick={() => {
          console.log('card');
        }}
      >
        <Card.Img
          variant="top"
          src={imageUrl}
          className={styles.CategoryImage}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="small">{description}</Card.Text>
        </Card.Body>
        <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
          <span>
            List: {completedWishes}/{totalWishes}
          </span>
          <BsArrowRightShort
            className={classNames(styles.ArrowRight, 'd-none d-sm-block')}
          />
        </div>
      </Card>
      <div className={styles.EditIconContainer} onClick={handleEdit}>
        <AiFillEdit fill="#000" className={styles.EditIcon} />
      </div>
    </div>
  );
}