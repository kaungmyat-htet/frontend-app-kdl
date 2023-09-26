import { createSlice } from '@reduxjs/toolkit';
import { STORE_NAMES} from '../../common/constants';

export const initialCareerPathState = () => ({
  fetching: false,
  errors: [],
  careerpaths: [],
});

export const pathCoursesState = () => ({
  fetching: false,
  errors: [],
  courses: [],
});

export const baseCareerPathReducers = {
  fetchCareerPathRequest(state) {
    state.fetching = true;
    state.erros = [];
    state.careerpaths = [];
  },
  fetchCareerPathSuccess(state, { payload }) {
    state.fetching = false;
    state.careerpaths = payload.careerpaths;
  },
  fetchingCareerPathFailure(state, { payload }) {
    state.fetching = false;
    state.errors = payload.errors;
  },
};

export const basePathCoursesReducers = {
  fetchPathCoursesRequest(state) {
    state.fetching = true;
    state.errors = [];
    state.courses = [];
  },
  fetchPathCoursesSuccess(state, { payload }) {
    state.fetching = false;
    state.courses = payload.courses;
  },
  fetchPathCoursesFailure(state, { payload }) {
    state.fetching = false;
    state.errors = payload.errors;
  },
};

const careerPathSlice = createSlice({
  name: STORE_NAMES.CAREERPATH,
  initialState: initialCareerPathState(),
  reducers: baseCareerPathReducers,
});

const pathCoursesSlice = createSlice({
  name: STORE_NAMES.PATHCOURSES,
  initialState: pathCoursesState(),
  reducers: baseCareerPathReducers,
});
export const careerpathReducer = careerPathSlice.reducer;
export const pathCoursesReducer = pathCoursesSlice.reducer;

export const careerpathActions = careerPathSlice.actions;
export const pathCoursesActions = pathCoursesSlice.actions;
