import styles from './ErrorContainer.module.css';

export function ErrorContainer({error}) {
  return <div className={styles.ErrorContainer}>Error! {error.message}</div>;
}
