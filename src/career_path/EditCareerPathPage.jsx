import {
  Container, Row, Col, DataTable, Button,
} from '@edx/paragon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Add } from '@edx/paragon/icons';
import AddNewPathCourseDialog from './AddNewPathCourseDialog';
import { getCareerPath, addNewPathCourse, deletePathCourse } from './data/api';
import InformModal from '../common/InformModal';
import ConfirmModal from '../common/ConfirmModal';

export const TABLE_HEADERS = {
  courseId: 'Course ID',
  courseName: 'Course Name',
  levelName: 'Level',
};

const columns = [
  {
    Header: TABLE_HEADERS.courseId,
    accessor: 'course_id',
  },
  {
    Header: TABLE_HEADERS.courseName,
    accessor: 'course_name',
  },
  {
    Header: TABLE_HEADERS.levelName,
    accessor: 'level_name',
  },
];

const EditCareerPathPage = () => {
  const [careerPathName, setCareerPathName] = useState('');
  const [careerPathDescription, setCareerPathDescription] = useState('');
  const [selectedPathCourse, setSelectedPathCourse] = useState({});
  const [courses, setCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAddNewPathCourseModalOpen, setIsAddNewPathCourseModalOpen] = useState(false);
  const [isInformModalOpen, setIsInformModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const props = useParams();
  const [formData, setFormData] = useState({
    careerpath_id: props.id,
    course_id: 'DEFAULT',
    level_id: 'DEFAULT',
  });

  async function fetchPathCoursesInfo(pathId) {
    setIsFetching(true);
    const data = await getCareerPath(pathId);
    console.log(data);
    setCareerPathName(data.name);
    setCareerPathDescription(data.description);
    setCourses(data.courses);
    setIsFetching(false);
  }
fetchPathCoursesInfo
  useEffect(() => {
    async function fetchCourses() {
      fetchPathCoursesInfo(props.id);
    }

    fetchCourses();
  }, [props.id]);

  const handleAddNewPath = () => {
    setIsAddNewPathCourseModalOpen(true);
    setModalTitle(`Add course into ${careerPathName} Career Path`);
  };

  const handleRemoveCourse = (pathCourse) => {
    console.log(pathCourse);
    setSelectedPathCourse(pathCourse);
    setMessage(`Are you sure you want to remove ${pathCourse.course_name} course from ${careerPathName}?`);
    setIsDeleteModalOpen(true);
  };

  const handleCancelRemove = () => {
    setSelectedPathCourse({});
    setIsDeleteModalOpen(false);
  };

  const handleConfirmRemove = async () => {
    try {
      const resp = await deletePathCourse(selectedPathCourse.id);
      console.log(resp);
      setMessage(resp.detail);
    } catch (e) {
      console.log(e);
      setMessage(e.response);
    } finally {
      setIsDeleteModalOpen(false);
      setIsInformModalOpen(true);
      setSelectedPathCourse({});
      await fetchPathCoursesInfo(props.id);
    }
  };

  const handleCloseAddNewPathModal = () => {
    setIsAddNewPathCourseModalOpen(false);
  };

  const handleCloseInformModal = async () => {
    setIsInformModalOpen(false);
    setMessage('');
    await fetchPathCoursesInfo(props.id);
  };

  const submitNewPathCourse = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const resp = await addNewPathCourse(formData);
      setMessage(resp.detail);
    } catch (error) {
      console.log(error.response);
      // TODO: Show error message to user when error occurred.
      setMessage(error.response.data);
    } finally {
      setIsAddNewPathCourseModalOpen(false);
      setIsInformModalOpen(true);
    }
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Container>
        {(isFetching && (
          <div>
            Loading...
          </div>
        )) || (
          <div className="mx-5 mt-3">
            <div>
              <h4 className="text-gray-700">Career Path Name</h4>
              <p className="lead">{careerPathName}</p>
              <div>
                <h4 className="text-gray-700">Description</h4>
                <div className="d-flex">
                  <p className="">{careerPathDescription}</p>
                  {/* <Button variant="link" size="inline">Edit</Button> */}
                </div>
              </div>
            </div>
            <Row>
              <Col>
                <p className="lead font-weight-bold pt-1">Courses</p>
              </Col>
              <Col>
                {/* <Button iconBefore={Add} className="float-right mr-4">Add New Course</Button> */}
                <Button variant="success" iconBefore={Add} className="float-right" onClick={() => handleAddNewPath()}>Add New
                  Course
                </Button>
              </Col>
            </Row>
            <div className="my-3 box-shadow-centered-2">
              <DataTable
                data={courses}
                columns={columns}
                itemCount={5}
                additionalColumns={[
                  {
                    id: 'action',
                    Header: 'Action',
                    Cell: ({ row }) => (
                      <Row>
                        {/* <Button */}
                        {/*   variant="link" */}
                        {/*   size="sm" */}
                        {/*   onClick={() => console.log(row.original.id)} */}
                        {/* >Edit */}
                        {/* </Button> */}
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleRemoveCourse(row.original)}
                        >Remove
                        </Button>
                      </Row>
                    ),
                  },
                ]}
              >
                <DataTable.Table />
                <DataTable.EmptyTable content="No Courses found." />
              </DataTable>
            </div>
          </div>
        )}
      </Container>
      <AddNewPathCourseDialog
        isOpen={isAddNewPathCourseModalOpen}
        onClose={handleCloseAddNewPathModal}
        formData={formData}
        handleSubmit={submitNewPathCourse}
        handleChange={handleChange}
        message={message}
        title={modalTitle}
      />
      <InformModal
        isOpen={isInformModalOpen}
        onClose={handleCloseInformModal}
        message={message}
        title="Message"
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        message={message}
      />
    </div>
  );
};

export default EditCareerPathPage;
