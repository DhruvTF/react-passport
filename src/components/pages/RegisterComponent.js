import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField, Card } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { RegisterAction } from "../../redux/actions/AuthActions";
import SnackbarComponent from "./SnackbarComponent";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All the States
  const [fields, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // States for Snackbar
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [msg, setMsg] = useState([]);
  const onClose = () => {
    setOpen(false);
  };

  // all the selectors
  const { success, error, message } = useSelector(
    (state) => state?.userAuth?.authResponse
  );

  // Handler for field change
  const handleFieldChange = (e) => {
    setState({
      ...fields,
      [e.target.id]: e.target.value,
    });
  };

  // Password Match function
  const checkPasswordMatch = (password, password_confirmation) => {
    return password !== password_confirmation ? true : false;
  };

  // Handler for login Form submit
  const UserRegister = (e) => {
    e.preventDefault();
    const passwordMatch = checkPasswordMatch(
      fields.password,
      fields.password_confirmation
    );
    if (passwordMatch === true) {
      setOpen(true)
      setVariant("error")
      setMsg("passwords dont match. please check your password again");
      return;
    }
    if (
      fields.name &&
      fields.email &&
      fields.password &&
      fields.password_confirmation
    )
      dispatch(RegisterAction(fields, navigate));
  };

  useEffect(() => {
    if (success === false) {
      setOpen(true);
      setVariant("error");
      if (error) {
        setMsg(error);
      } else if (message.email) {
        setMsg(message.email);
        return
      } else if (message.password) {
        setMsg(message.password);
      }
    }
  }, [message]);

  return (
    <div className="centeritem">
      <SnackbarComponent
        open={open}
        onClose={onClose}
        variant={variant}
        message={msg}
      />
      <Card>
        <h2>
          <b>Welcome to Register User Page</b>
        </h2>
        <form onSubmit={UserRegister} noValidate>
          <div>
            <TextField
              id="name"
              required
              label="Name"
              variant="outlined"
              margin="normal"
              className="fullwidth"
              onChange={handleFieldChange}
              error={fields.name ? false : true}
              helperText={
                !fields.name ? "Please provide your name" : "Looks Good"
              }
            />
          </div>
          <div>
            <TextField
              id="email"
              type="email"
              required
              label="Email"
              variant="outlined"
              margin="normal"
              className="fullwidth"
              onChange={handleFieldChange}
              error={fields.email ? false : true}
              helperText={
                !fields.email
                  ? "Please provide your email address."
                  : "Looks Good"
              }
            />
          </div>
          <div>
            <div>
              <TextField
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                required
                error={fields.password.length < 6 ? true : false}
                id="password"
                className="fullwidth"
                value={fields.password}
                onChange={handleFieldChange}
                helperText={
                  fields.password.length !== 6
                    ? "Please provide 6 digit password."
                    : "Looks Good"
                }
              />
            </div>
            <div>
              <TextField
                label="Confirm Password"
                type="password"
                required
                margin="normal"
                variant="outlined"
                id="password_confirmation"
                className="fullwidth"
                value={fields.password_confirmation}
                onChange={handleFieldChange}
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
                <b>Register</b>
              </Button>
              <br />
              <div className="linkcontainer">
                <Link to="/user/login">Login Here</Link>
              </div>
            </div>
            <div className="linkcontainer">
              <Link to="/home">Back To Home Page </Link>
            </div>
            <div></div>
          </div>
        </form>
      </Card>
    </div>
  );
}
