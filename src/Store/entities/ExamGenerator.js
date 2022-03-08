import { createSlice } from "@reduxjs/toolkit";

const ExamGenerator = createSlice({
  name: "exam-generator",
  initialState: {
    generatedQuestions: [],
    generatorProperties: {
      name: "",
      hard: 0,
      medium: 0,
      easy: 0,
      subjects: [],
    },
  },
  reducers: {
    SET_PROPERTIES: (store, action) => {
      store.generatorProperties[action.payload.property] = action.payload.value;
    },
  },
});

export default ExamGenerator.reducer;

export const actions = ExamGenerator.actions;
