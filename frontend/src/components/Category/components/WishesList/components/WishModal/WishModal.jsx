import {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {useMutation} from '@apollo/client';

import {WISH_MODAL, wishValidationSchema} from '../../utilities';
import {AppForm, DeleteModal, FormField, SubmitButton} from 'components/Shared';
import {CREATE_WISH} from './graphql/CreateWish';
import {UPDATE_WISH} from './graphql/UpdateWish';
import {DELETE_WISH} from './graphql/DeleteWish';

export function WishModal({wishModalOpen, setWishModalOpen, wishDetails}) {
  const [error, setError] = useState(null);
  const {id: categoryId} = useParams();

  const {title, location, description, timeline, cost} = wishDetails || {
    title: '',
    location: '',
    description: '',
    timeline: '',
    cost: '',
  };

  const initialValues = {
    title,
    location,
    description,
    timeline,
    cost,
  };

  const [createWish] = useMutation(CREATE_WISH, {
    onCompleted: () => {
      setError(null);
      setWishModalOpen(null);
    },
    onError: (error) => {
      setError(error.networkError.result.errors[0]);
    },
    refetchQueries: ['GetWishes'],
  });

  const [updateWish] = useMutation(UPDATE_WISH, {
    onCompleted: () => {
      setError(null);
      setWishModalOpen(null);
    },
    onError: (error) => {
      setError(error.networkError.result.errors[0]);
    },
    refetchQueries: ['GetWishes'],
  });

  const [deleteWish] = useMutation(DELETE_WISH, {
    onCompleted: () => {
      setError(null);
      setWishModalOpen(null);
    },
    onError: (error) => {
      setError(error.networkError.result.errors[0]);
    },
    refetchQueries: ['GetWishes'],
  });

  const handleCreateWish = async (values) => {
    await createWish({
      variables: {
        id: categoryId,
        input: {
          ...values,
          category: categoryId,
          cost: Number(values.cost),
        },
      },
    });
  };

  const handleUpdateWish = async (values) => {
    await updateWish({
      variables: {
        id: wishDetails.id,
        input: {
          ...values,
          cost: Number(values.cost),
        },
      },
    });
  };

  const handleDeleteWish = async (event) => {
    event.preventDefault();
    await deleteWish({
      variables: {
        id: wishDetails.id,
      },
    });
  };

  return (
    <Modal show={wishModalOpen} onHide={() => setWishModalOpen(null)} centered>
      {wishModalOpen === WISH_MODAL.DELETE_WISH ? (
        <DeleteModal
          title={wishDetails.title}
          message="Are you sure you want to delete this wish?"
          handleSubmit={handleDeleteWish}
          closeModal={() => setWishModalOpen(null)}
        />
      ) : (
        <AppForm
          initialValues={initialValues}
          onSubmit={
            wishModalOpen === WISH_MODAL.EDIT_WISH
              ? handleUpdateWish
              : handleCreateWish
          }
          validationSchema={wishValidationSchema}
        >
          <Modal.Header closeButton>
            <Modal.Title>Wish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormField
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title"
            />
            <FormField
              label="Location"
              name="location"
              type="text"
              placeholder="Enter location"
            />
            <FormField
              label="Description"
              name="description"
              type="text"
              placeholder="Enter description"
            />
            <FormField
              label="Timeline"
              name="timeline"
              type="date"
              placeholder="Enter timeline"
            />
            <FormField
              label="Cost"
              name="cost"
              type="number"
              placeholder="Enter cost"
            />
            {error && (
              <p className="text-danger text-center">{error.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton
              title={
                wishModalOpen === WISH_MODAL.CREATE_WISH ? 'Create' : 'Update'
              }
            />
            <button
              className="btn btn-secondary"
              onClick={() => setWishModalOpen(null)}
            >
              Close
            </button>
          </Modal.Footer>
        </AppForm>
      )}
    </Modal>
  );
}
