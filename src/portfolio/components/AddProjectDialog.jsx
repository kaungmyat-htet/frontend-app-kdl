import { Button, Form, ModalDialog } from '@edx/paragon';

const AddProjectDialog = (props) => {
  const modalBody = (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            name="title"
            value={props.formData.title}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            value={props.formData.description}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            name="role"
            value={props.formData.role}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Project URL</Form.Label>
          <Form.Control
            name="project_url"
            value={props.formData.project_url}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Youtube URL</Form.Label>
          <Form.Control
            name="youtube_url"
            value={props.formData.youtube_url}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            name="start_date"
            type="date"
            value={props.formData.start_date}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            name="end_date"
            type="date"
            value={props.formData.end_date}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Row className="float-right">
          <Button variant="success" type="submit">
            Create
          </Button>
          <Button variant="secondary" className="ml-3" onClick={props.onClose}>Close</Button>
        </Form.Row>
      </Form>
    </div>
  );
  return (
    <div>
      <ModalDialog
        size="lg"
        title="This is title"
        onClose={props.onClose}
        isOpen={props.isOpen}
      >
        <ModalDialog.Header>
          <ModalDialog.Title className="modal-title">
            {props.title}
          </ModalDialog.Title>
        </ModalDialog.Header>
        <ModalDialog.Body>
          {modalBody}
        </ModalDialog.Body>
      </ModalDialog>
    </div>
  );
};

export default AddProjectDialog;
