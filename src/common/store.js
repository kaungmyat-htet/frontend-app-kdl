import { configureStore } from '@reduxjs/toolkit';
import { careerpathReducer } from '../career_path/data/slice';
import { STORE_NAMES } from './constants';

export default configureStore({
  reducer: {
    [STORE_NAMES.CAREERPATH]: careerpathReducer,
  },
});
