import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const LMS_URL = getConfig().LMS_BASE_URL;
const PORTFOLIO_URL = `${LMS_URL}/api/kdl-portfolio/v1/`;

export const getProjects = async () => {
  const response = await getAuthenticatedHttpClient().get(`${PORTFOLIO_URL}projects/`);
  return response.data;
};

export const getUserInfo = async () => {
  // console.log(getAuthenticatedUser());
  const response = await getAuthenticatedHttpClient().get(`${PORTFOLIO_URL}student_career_info/`);
  return response.data;
};

export const createUserInfo = async (careerInfo) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${PORTFOLIO_URL}student_career_info/`, careerInfo);
  return response.data;
};

export const updateUserInfo = async (careerInfo) => {
  const response = await getAuthenticatedHttpClient()
    .put(`${PORTFOLIO_URL}student_career_info/${getAuthenticatedUser().username}`, careerInfo);
  return response.data;
};

export const createNewProject = async (projectData) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${PORTFOLIO_URL}projects/`, projectData);
  console.log(response);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await getAuthenticatedHttpClient()
    .delete(`${PORTFOLIO_URL}projects/?id=${projectId}`);
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
