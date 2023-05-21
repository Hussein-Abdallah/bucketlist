import {Spinner} from 'react-bootstrap';

import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.SpinnerContainer}>
      <Spinner animation="border" variant="light" className={styles.Spinner} />
    </div>
  );
}
