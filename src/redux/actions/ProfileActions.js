import { LoadProfile } from "../../services/ProfileServices";
import * as ActionTypes from "../ActionTypes";

export const LoadProfileAction = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOADING,
    });
    const token = localStorage.getItem("user-token");
    LoadProfile(token).then(
      (res) => {
        if (res.success) {
          dispatch({ type: ActionTypes.LOADPROFILE_SUCCESS, res });
        } else if (!res.success) {
          dispatch({ type: ActionTypes.LOADPROFILE_ERROR, res });
        }
      },
      (error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, error });
      }
    );
  };
};
