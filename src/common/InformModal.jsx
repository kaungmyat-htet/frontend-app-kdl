import {
  Button, ModalDialog, ActionRow,
} from '@edx/paragon';

const AddNewCareerDialog = (props) => {
  return (
    <div className="my-3">
      <ModalDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        hasCloseButton
        id="add-new-career-path"
        size="md"
        title="This is the title."
      >
        <ModalDialog.Header>
          <ModalDialog.Title className="modal-title">
            {props.title}
          </ModalDialog.Title>
        </ModalDialog.Header>
        <ModalDialog.Body>
          <div>
            {props.message}
          </div>
        </ModalDialog.Body>
        <ModalDialog.Footer>
          <ActionRow>
            <ModalDialog.CloseButton>
              Ok
            </ModalDialog.CloseButton>
          </ActionRow>
        </ModalDialog.Footer>
      </ModalDialog>
    </div>
  );
};

export default AddNewCareerDialog;
