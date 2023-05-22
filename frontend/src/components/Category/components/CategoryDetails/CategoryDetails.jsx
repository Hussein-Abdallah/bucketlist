import {getImageUrl} from 'foundation/utilities';
import {Image} from 'react-bootstrap';

import styles from './CategoryDetails.module.css';

export function CategoryDetails({title, description, image}) {
  const imageUrl = getImageUrl(image, false, {
    height: 400,
    width: 700,
  });

  return (
    <div className="col-12 col-lg-6 p-0">
      <Image src={imageUrl} fluid className={styles.CategoryImage} />
      <div className="p-3">
        <h1 className="my-2">{title}</h1>
        <p className="mb-3">{description}</p>
      </div>
    </div>
  );
}
