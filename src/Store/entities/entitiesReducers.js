import { combineReducers } from "redux";
import ExamGenerator from "./ExamGenerator";
import ExamSettings from "./ExamSettings";

const entitiesReducers = combineReducers({
  ExamGenerator,
  ExamSettings,
});

export default entitiesReducers;
