import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import createQuiz from "./createQuiz";
import addQuestion from "./createQuiz";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  create_quiz: createQuiz,
  add_question: addQuestion
});

export default rootReducer;