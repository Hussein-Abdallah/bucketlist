import {Header} from '../Header';
import styles from './IndexPage.module.css';
import {CategoriesList} from './components';

export function IndexPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerBody}>
        <Header />
        <CategoriesList />
      </div>
    </div>
  );
}
