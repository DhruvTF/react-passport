import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "@mui/material";

import Loader from "../loader/Loader";
import { LoadProfileAction } from "../../redux/actions/ProfileActions";

export default function Profile() {
  const dispatch = useDispatch();

  // All the Selectors
  const { data } = useSelector((state) => state?.userDetails?.userProfile);
  const { isLoading } = useSelector((state) => state?.userDetails);

  useEffect(() => {
    dispatch(LoadProfileAction());
    return () => {};
  }, []);

  return (
    <div className="fullwidthprofile">
      <Card>
        {isLoading ? (
          <Loader />
        ) : data?.length !== null ||
          data?.length !== undefined ||
          data?.length !== 0 ? (
          <div>
            <h3>
              <b>Name: {data?.name}</b>
            </h3>
            <h3>
              <b>email: {data?.email}</b>
            </h3>
            <h3>
              <b>Creation Date: {data?.created_at}</b>
            </h3>
          </div>
        ) : (
          <div>Unable to display profile</div>
        )}
      </Card>
    </div>
  );
}
