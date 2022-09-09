import * as ActionTypes from "../ActionTypes";
import {
  AddProductServices,
  getProductsServices,
  getSingleProductServices,
  updateProductServices,
  deleteProductServices,
} from "../../services/ProductServices";

export const addProductAction = (item, navigate) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    const token = localStorage.getItem("user-token");
    AddProductServices(item, token).then(
      (res) => {
        if (res?.success === true) {
          dispatch({ type: ActionTypes.ADD_PRODUCT_SUCCESS, res });
          navigate("/user/products");
        } else if (res?.success === false) {
          dispatch({ type: ActionTypes.ADD_PRODUCT_FAIL, res });
        }
      },
      () => {
        dispatch({ type: ActionTypes.CODE_ERROR });
      }
    );
  };
};

export const getAllProductAction = (page) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESTART_ALL_RESPONSE });
    dispatch({ type: ActionTypes.LOADING });
    const token = localStorage.getItem("user-token");
    getProductsServices(token, page).then(
      (res) => {
        dispatch({ type: ActionTypes.GET_ALL_PRODUCT_SUCCESS, res });
      },
      () => {
        dispatch({ type: ActionTypes.GET_ALL_PRODUCT_ERROR });
      }
    );
  };
};

export const getSingleProductAction = (id) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESTART_ALL_RESPONSE });

    dispatch({ type: ActionTypes.LOADING });
    const token = localStorage.getItem("user-token");
    getSingleProductServices(id, token).then(
      (res) => {
        if (res.success === true) {
          dispatch({ type: ActionTypes.GET_SINGLE_PRODUCT_SUCCESS, res });
        } else if (res.success === false) {
          dispatch({ type: ActionTypes.GET_SINGLE_PRODUCT_FAIL, res });
        }
      },
      () => {
        dispatch({ type: ActionTypes.CODE_ERROR });
      }
    );
  };
};

export const updateProductAction = (fields, pid, navigate) => {
  return (dispatch) => {
    let token = localStorage.getItem("user-token");
    dispatch({ type: ActionTypes.LOADING });
    updateProductServices(pid, token, fields).then(
      (res) => {
        if (res.success && res?.success === true) {
          dispatch({ type: ActionTypes.UPDATE_PRODUCT_SUCCESS, res });
          navigate(`/user/products/${pid}`);
        } else if (res.success === false) {
          dispatch({ type: ActionTypes.UPDATE_PRODUCT_FAIL, res });
        }
      },
      (err) => {
        dispatch({ type: ActionTypes.CODE_ERROR });
      }
    );
  };
};

export const deleteProductAction = (id, navigate) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESTART_ADD_PRODUCT_RESPONSE });

    dispatch({ type: ActionTypes.LOADING });
    const token = localStorage.getItem("user-token");
    deleteProductServices(id, token).then(
      (res) => {
        if (res.success === true) {
          dispatch({ type: ActionTypes.DELETE_PRODUCT_SUCCESS, res });
          navigate("/user/products");
        } else if (res.success && res.success === false) {
          dispatch({ type: ActionTypes.DELETE_PRODUCT_FAIL, res });
        }
      },
      () => {
        dispatch({ type: ActionTypes.CODE_ERROR });
      }
    );
  };
};
