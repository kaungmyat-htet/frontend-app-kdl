import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';

const KDL_URL = process.env.KDL_BASE_URL;

export const getCareerPaths = async () => {
  const client = getAuthenticatedHttpClient();
  const response = await client.get(`${KDL_URL}careerpaths`);
  // console.log(response);
  return response.data;
};

// const getCourseInfo = async (courseId) => {
//   const client = getHttpClient();
//   const response = client.get(`${KDL_URL}courses/${courseId}/`);
//   return response.name;
// };

export const getCareerPath = async (careerPathId) => {
  try {
    const client = getAuthenticatedHttpClient();
    const response = await client.get(`${KDL_URL}pathcourses?path_id=${careerPathId}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e.errorMessage);
    console.log('Please Login first');
  }
  return null;
  // console.log(client);
  // eslint-disable-next-line camelcase

  // const { courses } = response.data;
  // for (const item of courses) {
  //   const courseName = await getCourseInfo(item.course_id);
  // }

};

export const getLevels = async () => {
  const client = getAuthenticatedHttpClient();
  const response = await client.get(`${KDL_URL}levels`);
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
    .post(`${KDL_URL}careerpaths`, careerPathData);
  console.log(response);
  return response.data;
};

export const addNewPathCourse = async (pathCourseData) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${KDL_URL}pathcourses`, pathCourseData);
  console.log(response);
  return response.data;
};

export const deletePathCourse = async (pathCourseId) => {
  const response = await getAuthenticatedHttpClient()
    .delete(`${KDL_URL}pathcourses?id=${pathCourseId}`);
  console.log(response.data);
  return response.data;
};

export const getCourses = async (organizationName) => {
  const response = await getHttpClient().get(`${getConfig().LMS_BASE_URL}/api/courses/v1/courses/?org=${organizationName}`);
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
