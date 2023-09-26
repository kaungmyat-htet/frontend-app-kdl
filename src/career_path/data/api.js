import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';

// ensureConfig(['KDL_BASE_URL'], 'kdl API service');

export const getCareerPaths = async () => {
  const client = getAuthenticatedHttpClient();
  const response = await client.get('http://localhost:18000/api/edx-careerpaths/v1/careerpaths');
  // console.log(response);
  return response.data;
};

const getCourseInfo = async (courseId) => {
  const client = getHttpClient();
  const response = client.get(`http://localhost:18000/api/courses/v1/courses/${courseId}/`);
  return response.name;
};

export const getCareerPath = async (careerPathId) => {
  const client = getAuthenticatedHttpClient();
  // console.log(client);
  // eslint-disable-next-line camelcase
  const response = await client.get(`http://localhost:18000/api/edx-careerpaths/v1/pathcourses?path_id=${careerPathId}`);
  console.log(response.data);
  const { courses } = response.data;
  for (const item of courses) {
    const courseName = await getCourseInfo(item.course_id);

  }
  return response.data;
};

export const getLevels = async () => {
  const client = getAuthenticatedHttpClient();
  const response = await client.get('http://localhost:18000/api/edx-careerpaths/v1/levels');
  console.log(response.data);
  return response.data;
};

export const deleteCareerPath = async (careerPathId) => {
  const client = getAuthenticatedHttpClient();
  const response = await client.delete(`http://localhost:18000/api/edx-careerpaths/v1/careerpaths?id=${careerPathId}`);
  console.log(response.data);
  return response.data;
};

export const addNewCareerPath = async (careerPathData) => {
  const response = await getAuthenticatedHttpClient()
    .post('http://localhost:18000/api/edx-careerpaths/v1/careerpaths', careerPathData);
  console.log(response);
  return response.data;
};

export const addNewPathCourse = async (pathCourseData) => {
  const response = await getAuthenticatedHttpClient()
    .post('http://localhost:18000/api/edx-careerpaths/v1/pathcourses', pathCourseData);
  console.log(response);
  return response.data;
};

export const deletePathCourse = async (pathCourseId) => {
  const response = await getAuthenticatedHttpClient()
    .delete(`http://localhost:18000/api/edx-careerpaths/v1/pathcourses?id=${pathCourseId}`);
  console.log(response.data);
  return response.data;
};

export const getCourses = async (organizationName) => {
  const response = await getHttpClient().get(`http://localhost:18000/api/courses/v1/courses/?org=${organizationName}`);
  const courses = [];
  response.data.results.forEach((item) => {
    const course = {};
    course.id = item.id;
    course.name = item.name;
    courses.push(course);
  });
  return courses;
};

export default {
  getCareerPaths,
  getCareerPath,
  deleteCareerPath,
  addNewCareerPath,
  getLevels,
  getCourses,
  addNewPathCourse,
};
