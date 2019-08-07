import { CREATE_QUIZ } from "../actions/types";

const initialState = {

}

export default function (state = initialState, action) {
  switch(action.type) {
    case CREATE_QUIZ:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state
  }
}