import {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import {loader} from 'graphql.macro';

import {AppForm, FormField, SubmitButton, UploadImage} from 'components/Shared';
import {uploadImage} from 'foundation/utilities';
import {categoryValidationSchema} from '../../utilities';

const CREATE_CATEGORY = loader('./graphql/createCategory.graphql');

export function CategoryModal({CategoryModal, setCategoryModal}) {
  const [error, setError] = useState(null);

  const [createCategory, {loading}] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      setCategoryModal(null);
    },
    onError: (error) => {
      setError(error.networkError.result.errors[0]);
    },
    refetchQueries: ['GetCategories'],
  });

  const handleSubmit = async (values) => {
    setError(null);
    let public_id = null;

    if (values.image) {
      const result = await uploadImage(values.image);
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

  function closeModal() {
    setError(null);
    setCategoryModal(null);
  }

  return (
    <Modal
      show={CategoryModal !== null}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <AppForm
        initialValues={{
          title: '',
          description: '',
          image: '',
        }}
        onSubmit={handleSubmit}
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
          <UploadImage />
          {error && <p className="text-danger text-center">{error.message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton title="Create" spinner={loading} />
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </AppForm>
    </Modal>
  );
}
