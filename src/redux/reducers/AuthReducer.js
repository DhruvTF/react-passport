import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading:true,
  authResponse: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.RESTART_AUTH_REPONSE:
      return {
        ...state,
        authResponse: "",
      };
    case ActionTypes.LOADING:
      return {
        ...state,
        // authResponse: "loading...",
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading:false,
        authResponse: action.res,
      };
    case ActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        isLoading:false,
        authResponse: action.res,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading:false,
        authResponse: action.res,
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading:false,
        authResponse: action.res,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authResponse: action.res,
      };
    case ActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        isLoading:false,
        authResponse: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        isLoading:false,
        authResponse:
          "There seems to be a problem, please refersh your browser",
      };
    default:
      return state;
  }
};
export default authReducer;
