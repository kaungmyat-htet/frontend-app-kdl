import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';

export const getCareerPaths = async () => {
  console.log(getConfig().LMS_URL);
  const client = getAuthenticatedHttpClient();
  const response = await client.get(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/careerpaths`);
  // console.log(response);
  return response.data;
};

// const getCourseInfo = async (courseId) => {
//   const client = getHttpClient();
//   const response = client.get(`${LMS_URL}courses/${courseId}/`);
//   return response.name;
// };

export const getCareerPath = async (careerPathId) => {
  try {
    const client = getAuthenticatedHttpClient();
    const response = await client.get(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/pathcourses?path_id=${careerPathId}`);
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
  const response = await client.get(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/levels`);
  console.log(response.data);
  return response.data;
};

export const deleteCareerPath = async (careerPathId) => {
  const client = getAuthenticatedHttpClient();
  const response = await client.delete(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/careerpaths?id=${careerPathId}`);
  console.log(response.data);
  return response.data;
};

export const addNewCareerPath = async (careerPathData) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/careerpaths`, careerPathData);
  console.log(response);
  return response.data;
};

export const addNewPathCourse = async (pathCourseData) => {
  const response = await getAuthenticatedHttpClient()
    .post(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/pathcourses`, pathCourseData);
  console.log(response);
  return response.data;
};

export const deletePathCourse = async (pathCourseId) => {
  const response = await getAuthenticatedHttpClient()
    .delete(`${getConfig().LMS_BASE_URL}/api/kdl-careerpaths/v1/pathcourses?id=${pathCourseId}`);
  console.log(response.data);
  return response.data;
};

export const getCourses = async (organizationName) => {
  const paramObj = {
    org: organizationName,
  };
  const response = await getHttpClient().get(`${getConfig().LMS_BASE_URL}/api/courses/v1/courses/?page_size=50`, { params: paramObj });
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
