import {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import {loader} from 'graphql.macro';

import {AppForm, FormField, SubmitButton, UploadImage} from 'components/Shared';
import {getImageUrl, uploadImage} from 'foundation/utilities';
import {CATEGORY_MODAL, categoryValidationSchema} from '../../utilities';

const CREATE_CATEGORY = loader('./graphql/createCategory.graphql');
const UPDATE_CATEGORY = loader('./graphql/updateCategory.graphql');

export function CategoryModal({
  categoryModal,
  setCategoryModal,
  setCategory,
  category,
}) {
  const [error, setError] = useState(null);

  const {title, description, image} = category || {
    title: null,
    description: null,
    image: null,
  };
  const imageUrl =
    categoryModal === CATEGORY_MODAL.EDIT_CATEGORY && image
      ? getImageUrl(image)
      : null;

  const initialValues = {
    title,
    description,
    image: imageUrl,
  };

  const [createCategory, {loading: createLoading}] = useMutation(
    CREATE_CATEGORY,
    {
      onCompleted: () => {
        closeModal();
      },
      onError: (error) => {
        setError(error.networkError.result.errors[0]);
      },
      refetchQueries: ['GetCategories'],
    },
  );

  const [updateCategory, {loading: updateLoading}] = useMutation(
    UPDATE_CATEGORY,
    {
      onCompleted: () => {
        closeModal();
      },
      onError: (error) => {
        setError(error.networkError.result.errors[0]);
      },
      refetchQueries: ['GetCategories'],
    },
  );

  const handleCreateSubmit = async (values) => {
    setError(null);
    let public_id = null;

    if (values.image) {
      const result = await uploadImage(values.image);
      console.log(result);
      if (result.error) {
        setError(result.error);
        return;
      }
      public_id = result.public_id;
    }

    await createCategory({
      variables: {
        input: {
          title: values.title,
          description: values.description,
          image: public_id,
        },
      },
    });
  };

  const handleUpdateSubmit = async (values) => {
    setError(null);

    const updateValues = ['title', 'description'].reduce((acc, key) => {
      if (values[key] !== category[key]) {
        return {
          ...acc,
          [key]: values[key],
        };
      }
      return acc;
    }, {});

    if (values.image && `bucketlist/${values.image.name}` !== category.image) {
      const result = await uploadImage(values.image);
      if (result.error) {
        setError(result.error);
        return;
      }
      updateValues.image = result.public_id;
    } else if (!values.image && category.image) {
      updateValues.image = null;
    }

    if (Object.keys(updateValues).length === 0) {
      setError({message: 'No changes detected'});
      return;
    }
    await updateCategory({
      variables: {
        id: category.id,
        input: updateValues,
      },
    });
  };

  function closeModal() {
    setError(null);
    setCategory(null);
    setCategoryModal(null);
  }

  return (
    <Modal
      show={categoryModal !== null}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <AppForm
        initialValues={initialValues}
        onSubmit={
          categoryModal === CATEGORY_MODAL.NEW_CATEGORY
            ? handleCreateSubmit
            : handleUpdateSubmit
        }
        validationSchema={categoryValidationSchema}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormField
            name="title"
            label="Title"
            placeholder="Enter category title"
          />
          <FormField
            name="description"
            label="Description"
            placeholder="Enter category description"
            cols={30}
            rows={3}
            as="textarea"
          />
          <UploadImage image={imageUrl} />
          {error && <p className="text-danger text-center">{error.message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton
            title={
              categoryModal === CATEGORY_MODAL.NEW_CATEGORY
                ? 'Create'
                : 'Update'
            }
            spinner={createLoading || updateLoading}
          />
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </AppForm>
    </Modal>
  );
}
