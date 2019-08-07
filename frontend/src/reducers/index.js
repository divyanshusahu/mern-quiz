import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import createQuiz from "./createQuiz";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  create_quiz: createQuiz
});

export default rootReducer;