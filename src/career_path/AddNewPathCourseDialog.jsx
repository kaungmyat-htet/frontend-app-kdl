import {
  Button,
  ModalDialog,
  Form,
} from '@edx/paragon';
import { useState, useEffect } from 'react';

import { getCourses, getLevels } from './data/api';

const AddNewPathCourseDialog = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchInitialData() {
      setIsFetching(true);
      const levelData = await getLevels();
      const coursesData = await getCourses('KDL');
      // console.log(levelData);
      // console.log(coursesData);
      setCourses(coursesData);
      setLevels(levelData.levels);
      setIsFetching(false);
    }

    fetchInitialData();
  }, []);

  const modalBody = (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>Choose a course</Form.Label>
          <Form.Control
            name="course_id"
            as="select"
            value={props.formData.course_id}
            onChange={props.handleChange}
          >
            <option value="DEFAULT">Select Course</option>
            {
              courses.map(({
                id,
                name,
              }) => <option value={id} key={id}>{name}</option>)
            }
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Level</Form.Label>
          <Form.Control name="level_id" as="select" value={props.formData.level_id} onChange={props.handleChange}>
            <option value="DEFAULT">Select Level</option>
            {
              levels.map(({
                id,
                name,
              }) => <option value={id} key={id}>{name}</option>)
            }
          </Form.Control>
        </Form.Group>
        <Form.Row className="float-right">
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button className="ml-3" onClick={props.onClose}>Close</Button>
        </Form.Row>
      </Form>
    </div>
    // )
  );
  return (
    <ModalDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      hasCloseButton
      id="add-new-career-path"
      size="lg"
      title="This is the title."
    >
      <ModalDialog.Header>
        <ModalDialog.Title className="modal-title">
          {props.title}
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {(isFetching && (
          <div>
            Loading.....
          </div>
        )) || (
          <div>
            {modalBody}
          </div>
        )}
      </ModalDialog.Body>
    </ModalDialog>
  );
};

export default AddNewPathCourseDialog;
