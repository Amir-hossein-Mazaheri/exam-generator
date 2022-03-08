import { createSlice } from "@reduxjs/toolkit";

const initialGeneratorProperties = {
  name: "",
  hard: 0,
  medium: 0,
  easy: 0,
  subjects: [],
};

const ExamGenerator = createSlice({
  name: "exam-generator",
  initialState: {
    generatedQuestions: [],
    generatorProperties: initialGeneratorProperties,
  },
  reducers: {
    SET_PROPERTIES: (store, action) => {
      store.generatorProperties[action.payload.property] = action.payload.value;
    },
    SET_QUESTIONS: (store, action) => {
      store.generatedQuestions = action.payload.questions;
    },
    RESET_GENERATOR: (store) => {
      store.generatedQuestions = [];
      store.generatorProperties = initialGeneratorProperties;
    },
  },
});

export default ExamGenerator.reducer;

export const { SET_PROPERTIES, SET_QUESTIONS, RESET_GENERATOR } =
  ExamGenerator.actions;
