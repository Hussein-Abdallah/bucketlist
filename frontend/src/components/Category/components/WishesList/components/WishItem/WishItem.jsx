import {useState} from 'react';
import {AiFillEye, AiFillEdit, AiOutlineDelete} from 'react-icons/ai';
import {useMutation} from '@apollo/client';

import styles from './WishItem.module.css';
import {WISH_MODAL} from '../../utilities';
import {UPDATE_WISH_STATUS} from './graphql/UpdateWishStatus';

export function WishItem({wish, setWishModalOpen, setWishDetails}) {
  const [wishViewOpen, setWishViewOpen] = useState(false);

  const [updateWishStatus] = useMutation(UPDATE_WISH_STATUS, {
    onError: (error) => {
      alert(error.networkError.result.errors[0].message);
    },
    refetchQueries: ['GetWishes'],
  });

  function handleDeleteButton() {
    setWishModalOpen(WISH_MODAL.DELETE_WISH);
    setWishDetails(wish);
  }

  function handleEditButton() {
    setWishModalOpen(WISH_MODAL.EDIT_WISH);
    setWishDetails(wish);
  }

  function handleCheckboxChange() {
    console.log('wish', wish);
    updateWishStatus({
      variables: {
        id: wish.id,
        input: {
          status: !wish.status,
        },
      },
    });
  }

  return (
    <>
      <tr>
        <td className={styles.CheckboxContainer}>
          <input
            type="checkbox"
            aria-label="Checkbox to change the status of the wish"
            onChange={handleCheckboxChange}
            checked={wish.status}
          />
        </td>
        <td>{wish.title}</td>
        <td className="text-end w-50">
          <AiFillEye
            className={styles.ActionIcon}
            onClick={() => setWishViewOpen(!wishViewOpen)}
          />
          <AiFillEdit
            className={styles.ActionIcon}
            onClick={handleEditButton}
          />
          <AiOutlineDelete
            className={styles.ActionIcon}
            onClick={handleDeleteButton}
          />
        </td>
      </tr>
      <tr style={{display: wishViewOpen ? 'table-row' : 'none'}}>
        <td colSpan="3">
          <div className="container">
            <p>{wish.title}</p>
            <p>{wish.location}</p>
            <p>{wish.description}</p>
            <p>{wish.timeline}</p>
            <p>{wish.cost}</p>
          </div>
        </td>
      </tr>
    </>
  );
}
