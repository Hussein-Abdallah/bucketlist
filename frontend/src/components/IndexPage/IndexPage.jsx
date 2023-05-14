import {Card} from 'react-bootstrap';
import classNames from 'classnames';
import {BsPlusCircle, BsArrowRightShort} from 'react-icons/bs';

import {Header} from '../Header';
import styles from './IndexPage.module.css';

export function IndexPage() {
  return (
    <div className={styles.Container}>
      <div className={styles.Overlay} />
      <div className={styles.ContainerBody}>
        <Header />
        <div className="container pb-5">
          <div className="row">
            <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
              <Card className={classNames(styles.Card)}>
                <Card.Img variant="top" src="https://picsum.photos/800" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text className="small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia, quos voluptates
                    voluptate exercitationem quod voluptati
                  </Card.Text>
                </Card.Body>
                <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
                  <span className={styles.WishCount}>List: 0/100</span>
                  <BsArrowRightShort
                    className={classNames(
                      styles.ArrowRight,
                      'd-none d-sm-block',
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
              <Card className={classNames(styles.Card)}>
                <Card.Img variant="top" src="https://picsum.photos/800" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text className="small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia, quos voluptates
                    voluptate exercitationem quod voluptati
                  </Card.Text>
                </Card.Body>
                <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
                  <span className={styles.WishCount}>List: 0/100</span>
                  <BsArrowRightShort
                    className={classNames(
                      styles.ArrowRight,
                      'd-none d-sm-block',
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
              <Card className={classNames(styles.Card)}>
                <Card.Img variant="top" src="https://picsum.photos/800" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text className="small">Lorem ipsum dolor sit</Card.Text>
                </Card.Body>
                <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
                  <span className={styles.WishCount}>List: 0/100</span>
                  <BsArrowRightShort
                    className={classNames(
                      styles.ArrowRight,
                      'd-none d-sm-block',
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
              <Card className={classNames(styles.Card)}>
                <Card.Img variant="top" src="https://picsum.photos/800" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text className="small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia, quos v
                  </Card.Text>
                </Card.Body>
                <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
                  <span className={styles.WishCount}>List: 0/100</span>
                  <BsArrowRightShort
                    className={classNames(
                      styles.ArrowRight,
                      'd-none d-sm-block',
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="col-12 col-xl-3 col-lg-4 col-md-6 mt-3 d-block d-md-flex">
              <Card className={classNames(styles.Card)}>
                <Card.Img variant="top" src="https://picsum.photos/800" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text className="small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam voluptatum, quibusdam, quia
                  </Card.Text>
                </Card.Body>
                <div className="d-flex justify-content-between align-items-center px-3 small text-muted">
                  <span className={styles.WishCount}>List: 0/100</span>
                  <BsArrowRightShort
                    className={classNames(
                      styles.ArrowRight,
                      'd-none d-sm-block',
                    )}
                  />
                </div>
              </Card>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
