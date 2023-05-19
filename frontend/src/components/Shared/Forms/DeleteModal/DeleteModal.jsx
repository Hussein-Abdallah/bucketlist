import {Modal, Button} from 'react-bootstrap';

export function DeleteModal({title, message, closeModal, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`Delete ${title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>{message}</p>
          <p>This action cannot be undone.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" type="submit">
          Delete
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </form>
  );
}
