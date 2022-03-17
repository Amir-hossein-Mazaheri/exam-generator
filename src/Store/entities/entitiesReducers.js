import { combineReducers } from "redux";
import ExamGenerator from "./ExamGenerator";
import ExamSettings from "./ExamSettings";
import RawExams from "./RawExams";

const entitiesReducers = combineReducers({
  ExamGenerator,
  ExamSettings,
  RawExams,
});

export default entitiesReducers;
