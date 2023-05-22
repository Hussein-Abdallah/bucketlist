import {AiFillEye, AiFillEdit, AiOutlineDelete} from 'react-icons/ai';

import styles from './Wish.module.css';

export function WishItem({wish, setWishModalOpen}) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          aria-label="Checkbox to change the status of the wish"
          onChange={() => {
            console.log('change');
          }}
          checked={wish.status}
        />
      </td>
      <td>{wish.title}</td>
      <td className="text-end">
        <AiFillEye className={styles.ActionIcon} />
        <AiFillEdit className={styles.ActionIcon} />
        <AiOutlineDelete className={styles.ActionIcon} />
      </td>
    </tr>
  );
}
