import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Button, TextField, Card } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { LoginAction } from "../../redux/actions/AuthActions";
import SnackbarComponent from "./SnackbarComponent";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // selectors
  const { success, error, message } = useSelector(
    (state) => state?.userAuth?.authResponse
  );

  // All the States
  const [fields, setState] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [msg, setMsg] = useState([]);
  const onClose = () => {
    setOpen(false);
  };

  // Handler for Field change.
  const handleFieldChange = (e) => {
    setState({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };

  // Handler for Submitting form
  const UserLogin = (e) => {
    e.preventDefault();
    if (fields.email && fields.password)
      dispatch(LoginAction(fields, navigate));
  };

  useEffect(() => {
    if (success===false) {
      setOpen(true);
      setVariant("error");
      if (error) {
        setMsg(error);
      } else if (message) {
        setMsg(message.password);
      }
    }
  }, [success]);

  return (
    <div>
      <SnackbarComponent
        open={open}
        onClose={onClose}
        variant={variant}
        message={msg}
      />
      <div className="centeritem">
        <Card>
          <h2>
            <b>Welcome to User Login Page</b>
          </h2>
          <form onSubmit={UserLogin} noValidate>
            <div>
              <TextField
                id="email"
                type="email"
                required
                variant="outlined"
                margin="normal"
                className="fullwidth"
                onChange={handleFieldChange}
                error={fields?.email ? false : true}
                helperText={
                  !fields?.email
                    ? "Please provide your email address."
                    : "Looks Good"
                }
              />
            </div>
            <div>
              <div>
                <TextField
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  error={!fields?.password ? true : false}
                  id="password"
                  className="fullwidth"
                  onChange={handleFieldChange}
                  helperText={
                    !fields?.password?.length
                      ? "Please provide your password."
                      : "Looks Good"
                  }
                />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<AccountCircleIcon />}
                  className="fullwidth"
                >
                  <b>Login</b>
                </Button>
                <br />
              </div>
              <div className="linkcontainer">
                <Link to="/user/register">Register Here</Link>
              </div>
              <div className="linkcontainer">
                <Link to="/home">Back To Home Page </Link>
              </div>
              <div></div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
