import { createSlice } from "@reduxjs/toolkit";

const initialSettings = {
  start: "",
  end: "",
  duration: 0,
  listOfStudents: [],
  visibleAnswers: false,
  isRaw: false,
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
    RESET_EXAM_SETTINGS: (store) => {
      for (const key in initialSettings) {
        store[key] = initialSettings[key];
      }
    },
    SET_IS_RAW: (store, action) => {
      store.isRaw = action.payload.value;
    },
    TOGGLE_RANDOMIZE: (store, action) => {
      store.randomize = action.payload.status;
    },
  },
});

export default examSettings.reducer;

export const {
  CHANGE_EXAM_SETTING,
  SET_STUDENT_LIST,
  PUSH_TO_STUDENT_LIST,
  RESET_EXAM_SETTINGS,
  SET_IS_RAW,
  TOGGLE_RANDOMIZE,
} = examSettings.actions;
