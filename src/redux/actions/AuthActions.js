import * as ActionTypes from "../ActionTypes";
import {
  RegisterUserService,
  LoginUserService,
  LogOutUserService,
} from "../../services/AuthServices";

// for Register or SignUP
export const RegisterAction = (credentials, navigate) => {
  return (dispatch) => {
    // dispatch({ type: ActionTypes.RESTART_AUTH_REPONSE });
    dispatch({ type: ActionTypes.LOADING });

    RegisterUserService(credentials).then(
      (res) => {
        if (res.success) {
          navigate("/user/login");
          dispatch({ type: ActionTypes.SIGNUP_SUCCESS, res });
        } else if (res.success === false) {
          dispatch({ type: ActionTypes.SIGNUP_ERROR, res });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};
// for logIn

export const LoginAction = (credentials, navigate) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESTART_AUTH_REPONSE });
    dispatch({ type: ActionTypes.LOADING });
    LoginUserService(credentials).then(
      (res) => {
        if (res.success) {
          localStorage.setItem("user-token", res.token);

          dispatch({ type: ActionTypes.LOGIN_SUCCESS, res });
          navigate("/user/products");
        } else if (res.success === false) {
          dispatch({ type: ActionTypes.LOGIN_ERROR, res });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};

// For LogOut

export const LogOutAction = (navigate) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESTART_ALL_RESPONSE });
    const token = localStorage.getItem("user-token");
    LogOutUserService(token).then(
      (res) => {
        if (res.success === true) {
          localStorage.removeItem("user-token");
          dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res });
          navigate("/home");
        } else if (res.success === false) {
          dispatch({ type: ActionTypes.LOGOUT_FAIL });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};
