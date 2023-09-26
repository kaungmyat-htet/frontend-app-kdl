import { Button, ModalDialog } from '@edx/paragon';

const ConfirmModal = (props) => {
  return (
    <ModalDialog isOpen={props.isOpen} title="This is the title" onClose={props.onClose}>
      <ModalDialog.Header>
        <ModalDialog.Title className="modal-title">
          Confirmation
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <div>{props.message}</div>
        <div className="float-right mt-3">
          <Button variant="danger" onClick={props.onConfirm}>Confirm</Button>
          <Button variant="light" className="ml-3" onClick={props.onClose}>Cancel</Button>
        </div>
      </ModalDialog.Body>
    </ModalDialog>
  )
};

export default ConfirmModal;