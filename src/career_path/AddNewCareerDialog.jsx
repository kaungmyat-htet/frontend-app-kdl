import {
  Button, ModalDialog, Alert, Form,
} from '@edx/paragon';
import { useState } from 'react';

import { Add } from '@edx/paragon/icons';
import { addNewCareerPath } from './data/api';

const AddNewCareerDialog = (props) => {
  const modalBody = (
    <div>
      <Form onSubmit={props.handleSubmit}>
        {/* method="POST" */}
        {/* accept-method="UTF-8" */}
        <Form.Group>
          <Form.Label>Career Path Name</Form.Label>
          <Form.Control
            name="name"
            value={props.formData.name}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={props.formData.description}
            onChange={props.handleChange}
            as="textarea"
            autoResize
            floatinglabel="Please describe about the career path."
          />
        </Form.Group>
        <Form.Row className="float-right">
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button className="ml-3" onClick={props.onClose}>Close</Button>
        </Form.Row>
      </Form>
    </div>
  );
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
          {modalBody}
        </ModalDialog.Body>
        {/* <ModalDialog.Footer> */}
        {/*   <ActionRow> */}
        {/*     <ModalDialog.CloseButton> */}
        {/*       Close */}
        {/*     </ModalDialog.CloseButton> */}
        {/*   </ActionRow> */}
        {/* </ModalDialog.Footer> */}
      </ModalDialog>
    </div>
  );
};

export default AddNewCareerDialog;
