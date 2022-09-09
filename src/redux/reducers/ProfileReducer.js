import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: true,
  userProfile: "",
};

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
      };
    case ActionTypes.LOADPROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action.res,
      };
    case ActionTypes.LOADPROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        userProfile: action.res,
      };
    case ActionTypes.CODE_ERROR:
      return {
        ...state,
        isLoading: false,
        userProfile: "There seems to be a problem, please refersh your browser",
      };
    default:
      return state;
  }
};

export default ProfileReducer;
