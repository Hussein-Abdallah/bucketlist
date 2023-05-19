import {Outlet} from 'react-router-dom';
import {Header} from '../Header';
import styles from './IndexPage.module.css';

export function IndexPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerBody}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
