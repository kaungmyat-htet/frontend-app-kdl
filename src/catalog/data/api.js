import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser, getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

ensureConfig(['LMS_BASE_URL'], 'course API service');

export const getCourses = async () => {
  const client = getAuthenticatedHttpClient();
  console.log(client);
  if (client === null) {
    console.log("The user is null.");
  }
  // console.log(getAuthenticatedUser().username);
  const baseUrl = getConfig().LMS_BASE_URL;
  const response = await client.get(`${baseUrl}/api/courses/v1/courses/?org=KDL`);
  // This data is actually paginated. The results object contains
  // the first page. For simplicity's sake, we're going to ignore
  // pagination and just use the first page
  console.log(response.data.results);
  return response.data.results;
};

export default { getCourses };
