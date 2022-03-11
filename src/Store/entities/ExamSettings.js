import { createSlice } from "@reduxjs/toolkit";

const initialSettings = {
  start: "",
  end: "",
  duration: "",
  listOfStudents: [],
  visibleAnswers: false,
  randomize: false,
};

const examSettings = createSlice({
  name: "exam-settings",
  initialState: initialSettings,
  reducers: {
    CHANGE_EXAM_SETTING: (store, action) => {
      store[action.payload.property] = action.payload.value;
    },
    SET_STUDENT_LIST: (store, action) => {
      store.listOfStudents = action.payload.list;
    },
    PUSH_TO_STUDENT_LIST: (store, action) => {
      store.listOfStudents.push(action.payload.value);
    },
  },
});

export default examSettings.reducer;

export const { CHANGE_EXAM_SETTING, SET_STUDENT_LIST, PUSH_TO_STUDENT_LIST } =
  examSettings.actions;
