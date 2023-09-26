import * as api from './api';
import { careerpathActions as actions } from './slice';

export const fetchCareerPaths = () => async (dispatch) => {
  try {
    dispatch(actions.fetchCareerPathRequest({}));
    const careerPaths = await api.getCareerPaths();
    dispatch(actions.fetchCareerPathSuccess({ careerPaths }));
  } catch (err) {
    dispatch(actions.fetchingCareerPathFailure({ error: [String(err)] }));
  }
};

export default { fetchCareerPaths };
