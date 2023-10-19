import { useEffect, useState } from 'react';
import { Button, Container } from '@edx/paragon';
import { getProjects, createNewProject } from '../data/api';
import AddProjectDialog from './AddProjectDialog';
import InformModal from '../../common/InformModal';
import ProjectsTable from './ProjectsTable';

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    project_url: '',
    youtube_url: '',
    role: '',
    start_date: '',
    end_date: '',
  });
  const [message, setMessage] = useState(null);
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);

  async function fetchProjects() {
    try {
      const data = await getProjects();
      setProjects(data.projects);
      console.log(data);
    } catch (e) {
      console.log('error fetching projects.');
    }
  }
  const handleOpenAddProjectModal = () => {
    setModalTitle('Add New Project');
    setIsAddProjectModalOpen(true);
  };

  const handleCloseModal = () => {
    setMessage(null);
    setIsAddProjectModalOpen(false);
  };

  const handleCloseConfirmModal = async () => {
    setIsConfirmModalOpen(false);
    setMessage(null);
    await fetchProjects();
  };

  const handleFormChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setNewProject((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCreateProject = async (event) => {
    event.preventDefault();
    console.log(newProject);
    try {
      const resp = await createNewProject(newProject);
      setMessage(resp.detail);
    } catch (e) {
      console.log(e.response);
      setMessage(e.response.data.detail);
    } finally {
      setIsAddProjectModalOpen(false);
      setModalTitle('Confirm Message');
      setIsConfirmModalOpen(true);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [isProjectDeleted]);

  return (
    <div>
      <div>
        <Button onClick={handleOpenAddProjectModal}>Add Project</Button>
        <ProjectsTable
          projects={projects}
          setProjectDeleted={setIsProjectDeleted}
          getProjects={fetchProjects}
        />
      </div>
      <AddProjectDialog
        isOpen={isAddProjectModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        formData={newProject}
        handleChange={handleFormChange}
        handleSubmit={handleCreateProject}
      />
      <InformModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        title={modalTitle}
        message={message}
      />
    </div>
  );
};

export default ProjectSection;
