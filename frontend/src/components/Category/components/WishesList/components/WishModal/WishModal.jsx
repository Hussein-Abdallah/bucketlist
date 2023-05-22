import {AppForm, FormField, SubmitButton} from 'components/Shared';
import {Modal} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

export function WishModal({categoryId, wishModalOpen, setWishModalOpen}) {
  const {id} = useParams();

  const initialValues = {
    title: '',
    location: '',
    description: '',
    image: '',
    timeline: '',
    cost: '',
  };

  const handleCreateWish = async (values) => {
    console.log(id);
    console.log(values);
  };

  return (
    <Modal show={wishModalOpen} onHide={() => setWishModalOpen(null)} centered>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleCreateWish}
        // validationSchema={wishValidationSchema}
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
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton title="Create" />
          <button
            className="btn btn-secondary"
            onClick={() => setWishModalOpen(null)}
          >
            Close
          </button>
        </Modal.Footer>
      </AppForm>
    </Modal>
  );
}
