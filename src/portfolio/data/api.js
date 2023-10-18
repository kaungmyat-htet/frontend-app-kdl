import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

export const getProjects = async () => {
  const response = await getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/projects/`);
  return response.data;
};

export const getUserInfo = async () => {
  // console.log(getAuthenticatedUser());
  const response = await getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/student_career_info/`);
  return response.data;
};

export const createUserInfo = async (careerInfo) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/student_career_info/`, careerInfo);
  return response.data;
};

export const updateUserInfo = async (careerInfo) => {
  const response = await getAuthenticatedHttpClient()
    .put(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/student_career_info/${getAuthenticatedUser().username}`, careerInfo);
  return response.data;
};

export const createNewProject = async (projectData) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/projects/`, projectData);
  console.log(response);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await getAuthenticatedHttpClient()
    .delete(`${getConfig().LMS_BASE_URL}/api/kdl-portfolio/v1/projects/?id=${projectId}`);
  return response.data;
};
export default {
  getProjects,
  getUserInfo,
  createNewProject,
  deleteProject,
  createUserInfo,
  updateUserInfo,
};
