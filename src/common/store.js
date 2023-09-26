import { configureStore } from '@reduxjs/toolkit';
import { catalogReducer } from '../catalog/data/slice';
import { careerpathReducer } from '../career_path/data/slice';
import { STORE_NAMES } from './constants';

export default configureStore({
  reducer: {
    [STORE_NAMES.CATALOG]: catalogReducer,
    [STORE_NAMES.CAREERPATH]: careerpathReducer,
  },
});
