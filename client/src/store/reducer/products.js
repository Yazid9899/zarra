import {
  PRODUCTS_DELETE,
  PRODUCTS_EDIT,
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_LOADING,
  PRODUCT_ERROR_MESSAGE,
  PROUDUCT_BY_ID_GET,
} from "../action/actionType";

// State ini sifatnya immutable
const initialState = {
  products: [],
  loading: false,
  errorMessage: null,
  productById: null,
};

// Pure Function
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCT_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errors,
      };
    case PROUDUCT_BY_ID_GET:
      return {
        ...state,
        productById: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
