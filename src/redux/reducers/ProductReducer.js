import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: true,
  allProducts: "",
  singleProduct: "",
  addProduct: "",
  updateProduct: "",
};

const ProductReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.RESTART_ALL_RESPONSE:
      return {
        addProduct: "",
        singleProduct: "",
        updateProduct: "",
        allProducts: "",
      };
    case ActionTypes.RESTART_ADD_PRODUCT_RESPONSE:
      return {
        ...state,
        addProduct: "",
      };
    case ActionTypes.RESTART_SINGLE_PRODUCT_RESPONSE:
      return {
        ...state,
        singleProduct: "",
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        addProduct: action.res,
      };
    }
    case ActionTypes.ADD_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        addProduct: action.res,
      };
    }
    case ActionTypes.GET_ALL_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allProducts: action.res,
      };
    }
    case ActionTypes.GET_ALL_PRODUCT_ERROR: {
      return {
        ...state,
        isLoading: false,
        allProducts: action.res,
      };
    }
    case ActionTypes.GET_SINGLE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        singleProduct: action.res,
      };
    }
    case ActionTypes.GET_SINGLE_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        singleProduct: action.res,
      };
    }
    case ActionTypes.UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        updateProduct: action.res,
      };
    }
    case ActionTypes.UPDATE_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        updateProduct: action.res,
      };
    }
    case ActionTypes.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        singleProduct: action.res,
      };
    }
    case ActionTypes.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        singleProduct: action.res,
      };
    }
    default:
      return state;
  }
};
export default ProductReducer;
