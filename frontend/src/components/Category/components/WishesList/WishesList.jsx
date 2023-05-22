import {useState} from 'react';
import {ProgressBar, Table} from 'react-bootstrap';

import styles from './WishesList.module.css';
import {WishItem, WishModal} from './components';
import {WISH_MODAL} from './constants';

export function WishesList({wishes, totalWishes, completedWishes}) {
  const [wishModalOpen, setWishModalOpen] = useState(null);
  const progressStatus = (completedWishes / totalWishes) * 100 || 0;
  return (
    <>
      <div className="col-12 col-lg-6">
        <h1 className="mt-2">Wishes list</h1>
        <ProgressBar
          variant="success"
          now={progressStatus}
          label={`${progressStatus}%`}
          animated
          className={styles.ProgressBar}
        />
        <div className="d-flex justify-content-between">
          <p className="mb-0">Achieved: {completedWishes}</p>
          <p className="mb-0">Total: {totalWishes}</p>
        </div>
        <hr />
        <Table hover>
          <tbody>
            {wishes.map((wish) => (
              <WishItem
                key={wish.id}
                wish={wish}
                setWishModalOpen={setWishModalOpen}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => setWishModalOpen(WISH_MODAL.NEW_WISH)}
                >
                  New Wish
                </button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <WishModal
        wishModalOpen={wishModalOpen}
        setWishModalOpen={setWishModalOpen}
      />
    </>
  );
}
