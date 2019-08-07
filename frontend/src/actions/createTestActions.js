import axios from "axios";
import { CREATE_QUIZ, GET_ERRORS } from "./types";

// Create Quiz
export const createQuiz = (userData) => dispatch => {
  axios
    .post("/api/tests/create_test", userData)
    .then(res => {
      dispatch(setQuizId(res.data));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const setQuizId = (data) => {
  return {
    type: CREATE_QUIZ,
    payload: data
  }
}
