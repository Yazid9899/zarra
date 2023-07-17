import {
  CATEGORIES_ERROR_MESSAGE,
  CATEGORIES_GET_SUCCESS,
} from "../action/actionType";

const initialState = {
  category: [],
  errorMessage: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CATEGORIES_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errors,
      };
    default:
      return state;
      break;
  }
};
export default categoryReducer;
