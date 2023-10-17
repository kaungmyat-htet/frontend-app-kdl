import { useState, useEffect } from 'react';

// edx Paragon
import {
  Button,
  DataTable, Row,
} from '@edx/paragon';

import ConfirmModal from '../../common/ConfirmModal';

import { deleteProject } from '../data/api';
import InformModal from '../../common/InformModal';

export const TABLE_HEADERS = {
  projectName: 'Project Title',
  projectID: 'ID',
  role: 'Role',
  start_date: 'Start Date',
  end_date: 'End Date',
};

const columns = [
  // {
  //   Header: TABLE_HEADERS.careerPathID,
  //   accessor: 'id',
  // },
  {
    Header: TABLE_HEADERS.projectName,
    accessor: 'title',
  },
  {
    Header: TABLE_HEADERS.role,
    accessor: 'role',
  },
  {
    Header: TABLE_HEADERS.start_date,
    accessor: 'start_date',
  },
  {
    Header: TABLE_HEADERS.end_date,
    accessor: 'end_date',
  },
];

const ProjectsTable = (props) => {
  const [selectedProject, setSelectedProject] = useState({});
  const [message, setMessage] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInformModalOpen, setIsInformModalOpen] = useState(false);

  const handleDeleteProject = async (project) => {
    console.log(project);
    setSelectedProject(project);
    setMessage(`Are you sure you want to delete ${project.title}?`);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDeleteProject = async () => {
    const resp = await deleteProject(selectedProject.id);
    console.log(resp);
    setIsConfirmModalOpen(false);
    setSelectedProject({});
    setMessage(resp.detail);
    setIsInformModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    console.log(selectedProject);
    setMessage(null);
    setIsConfirmModalOpen(false);
    setSelectedProject({});
    // eslint-disable-next-line react/prop-types
    props.getProjects();
  };

  const handleInformModalClose = () => {
    setMessage(null);
    setIsInformModalOpen(false);
    setSelectedProject({});
    // eslint-disable-next-line react/prop-types
    props.getProjects();
  };

  return (
    <div className="my-3">
      <div>
        <DataTable
          data={props.projects}
          columns={columns}
          itemCount={10}
          additionalColumns={[
            {
              id: 'action',
              Header: 'Action',
              Cell: ({ row }) => (
                <Row>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleDeleteProject(row.original)}
                  >Delete
                  </Button>
                </Row>
              ),
            },
          ]}
        >
          <DataTable.Table />
        </DataTable>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmDeleteProject}
        message={message}
      />
      <InformModal
        isOpen={isInformModalOpen}
        onClose={handleInformModalClose}
        title="Message"
        message={message}
      />
    </div>
  );
};

export default ProjectsTable;
