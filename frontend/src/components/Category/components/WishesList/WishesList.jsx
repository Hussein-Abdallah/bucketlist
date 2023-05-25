import {useEffect, useState} from 'react';
import {ProgressBar, Table} from 'react-bootstrap';

import styles from './WishesList.module.css';
import {WishItem, WishModal} from './components';
import {WISH_MODAL} from './utilities';
import {useQuery} from '@apollo/client';
import {loader} from 'graphql.macro';
import {LoadingSpinner, ErrorContainer} from 'components/Shared';

const GET_WISHES = loader('./graphql/GetWishes.graphql');

export function WishesList({categoryId}) {
  const [wishStatus, setWishStatus] = useState({
    completedWishes: 0,
    totalWishes: 0,
  });
  const [wishModalOpen, setWishModalOpen] = useState(null);
  const [wishDetails, setWishDetails] = useState(null);
  const progressStatus =
    Math.floor((wishStatus.completedWishes / wishStatus.totalWishes) * 100) ||
    0;

  const {data, loading, error} = useQuery(GET_WISHES, {
    variables: {id: categoryId},
  });

  useEffect(() => {
    if (data) {
      setWishStatus({
        completedWishes: data.wishes.filter((wish) => wish.status).length,
        totalWishes: data.wishes.length,
      });
    }
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

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
          <p className="mb-0">Achieved: {wishStatus.completedWishes}</p>
          <p className="mb-0">Total: {wishStatus.totalWishes}</p>
        </div>
        <hr />
        <Table hover>
          <tbody>
            {data.wishes.map((wish) => (
              <WishItem
                key={wish.id}
                wish={wish}
                setWishModalOpen={setWishModalOpen}
                setWishDetails={setWishDetails}
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
        wishDetails={wishDetails}
      />
    </>
  );
}
