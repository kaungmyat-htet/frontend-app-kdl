import {
  Container, Row, DataTable, Button, Col, ModalDialog
} from '@edx/paragon';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Add } from '@edx/paragon/icons';
import { getCareerPaths, deleteCareerPath, addNewCareerPath } from './data/api';

import InformModal from '../common/InformModal';
import ConfirmModal from '../common/ConfirmModal';
import AddNewCareerDialog from './AddNewCareerDialog';

export const TABLE_HEADERS = {
  careerPathName: 'Career Path Name',
  careerPathID: 'ID',
};

const columns = [
  // {
  //   Header: TABLE_HEADERS.careerPathID,
  //   accessor: 'id',
  // },
  {
    Header: TABLE_HEADERS.careerPathName,
    accessor: 'name',
  },
];

const CareerPage = () => {
  const navigate = useHistory();
  const [careerPaths, setCareerPaths] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCareerPath, setSelectedCareerPath] = useState({});
  const [isAddCareerPathModalOpen, setIsAddCareerPathModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [newCareerData, setNewCareerData] = useState({ name: '', description: '' });
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState(null);

  async function fetchCareerPathInfo() {
    setIsFetching(true);
    const data = await getCareerPaths();
    setCareerPaths(data.careerpaths);
    setIsFetching(false);
  }

  useEffect(() => {
    async function fetchCareerPaths() {
      fetchCareerPathInfo();
    }

    fetchCareerPaths();
  }, []);

  const handleOpenAddCareerPathModal = () => {
    setTitle('Create New Career Path');
    setIsAddCareerPathModalOpen(true);
  };

  const handleCloseAddCareerModal = () => {
    setTitle('');
    setIsAddCareerPathModalOpen(false);
  };

  const handleCreateNewCareerPath = async (event) => {
    event.preventDefault();
    const resp = await addNewCareerPath(newCareerData);
    setMessage(resp.detail);
    setIsAddCareerPathModalOpen(false);
    setTitle('Confirm Message');
    setIsConfirmModalOpen(true);
    // setModelTitle('Message');
  };

  const handleFormChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setNewCareerData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDeleteCareerPath = async (careerPath) => {
    setSelectedCareerPath(careerPath);
    setMessage(`Are you sure you want to delete ${careerPath.name} Career Path?`);
    setDeleteModalIsOpen(true);
  };

  const handleCloseModal = async () => {
    setIsConfirmModalOpen(false);
    setMessage(null);
    await fetchCareerPathInfo();
  };
  const handleCancelDelete = () => {
    console.log(selectedCareerPath);
    setMessage(null);
    setDeleteModalIsOpen(false);
    setSelectedCareerPath({});
  };
  const handleConfirmDelete = async () => {
    const resp = await deleteCareerPath(selectedCareerPath.id);
    console.log(resp);
    setDeleteModalIsOpen(false);
    setSelectedCareerPath({});
    setMessage(resp.detail);
    setTitle("Message");
    setIsConfirmModalOpen(true);
    await fetchCareerPathInfo();
  };

  const navigatePath = (id) => {
    console.log(id);
    navigate.push(`/careerpath/${id}`);
  };

  return (
    <div>
      <Container className="my-2 px-5">
        <Row className="">
          <Col>
            <h3 className="pt-1">
              Career Path Management
            </h3>
          </Col>
          <Col>
            <Button variant="success" iconBefore={Add} className="float-right" onClick={handleOpenAddCareerPathModal}>Add New
              Career Path
            </Button>
          </Col>
        </Row>
        {(isFetching && (
          <div>
            Loading....
          </div>
        )) || (
          <div className="my-3">
            <DataTable
              data={careerPaths}
              columns={columns}
              itemCount={25}
              isPaginated
              additionalColumns={[
                {
                  id: 'action',
                  Header: 'Action',
                  Cell: ({ row }) => (
                    <Row>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigatePath(row.original.id)}
                      >Edit
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleDeleteCareerPath(row.original)}
                      >Delete
                      </Button>
                    </Row>
                  ),
                },
              ]}
            >
              <DataTable.Table />
              <DataTable.EmptyTable content="No Career Paths found" />
              <DataTable.TableFooter />
            </DataTable>
          </div>
        )}
        {/* <ModalDialog isOpen={deleteModalIsOpen} title="This is the title" onClose={handleCloseModal}> */}
        {/*   <ModalDialog.Body> */}
        {/*     {message} */}
        {/*   </ModalDialog.Body> */}
        {/* </ModalDialog> */}
      </Container>
      <AddNewCareerDialog
        isOpen={isAddCareerPathModalOpen}
        onClose={handleCloseAddCareerModal}
        formData={newCareerData}
        title={title}
        handleSubmit={handleCreateNewCareerPath}
        handleChange={handleFormChange}
      />
      <InformModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseModal}
        title={title}
        message={message}
      />
      <ConfirmModal
        isOpen={deleteModalIsOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={message}
      />
    </div>
  );
};

export default CareerPage;
