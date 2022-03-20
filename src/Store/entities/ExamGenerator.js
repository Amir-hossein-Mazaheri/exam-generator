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
    isRedirectedFromRawExam: false,
  },
  reducers: {
    SET_PROPERTIES: (store, action) => {
      store.generatorProperties[action.payload.property] = action.payload.value;
    },
    SET_QUESTIONS: (store, action) => {
      store.generatedQuestions = action.payload.questions;
    },
    APPEND_QUESTION: (store, action) => {
      store.generatedQuestions.push(action.payload.question);
    },
    RESET_GENERATOR: (store) => {
      store.generatedQuestions = [];
      store.generatorProperties = initialGeneratorProperties;
      store.isRedirectedFromRawExam = false;
    },
    SET_REDIRECTED_FROM_RAW_EXAM: (store, action) => {
      store.isRedirectedFromRawExam = action.payload.status;
    },
  },
});

export default ExamGenerator.reducer;

export const {
  SET_PROPERTIES,
  SET_QUESTIONS,
  RESET_GENERATOR,
  APPEND_QUESTION,
  SET_REDIRECTED_FROM_RAW_EXAM,
} = ExamGenerator.actions;
