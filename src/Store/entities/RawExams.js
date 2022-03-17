import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rawExams: [],
  isExamLoading: false,
};

const rawExams = createSlice({
  name: "raw-exam",
  initialState,
  reducers: {
    SET_RAW_EXAMS: (store, action) => {
      store.rawExams = action.payload.rawExams;
    },
    TOGGLE_EXAM_LOADING: (store, action) => {
      store.isExamLoading = action.payload.status;
    },
  },
});

export default rawExams.reducer;

export const { SET_RAW_EXAMS, TOGGLE_EXAM_LOADING } = rawExams.actions;
