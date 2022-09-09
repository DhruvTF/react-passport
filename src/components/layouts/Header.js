import React from "react";

import { Stack } from "@mui/system";
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  CssBaseline,
  Container,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import "../../styles/styles.css";
import MenuList from "./MenuList";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user-token");

  return (
    <div className="homeroot">
      <CssBaseline />
      <AppBar position="fixed" className="appbar">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              className="title"
              textAlign="initial"
            >
              <Link to="/home" className="link">
                {" "}
                REACT-PASSPORT{" "}
              </Link>
            </Typography>

            {token !== null && token !== "" ? (
              <Stack direction="row" spacing={2}>
                <Button
                  color="inherit"
                  onClick={(e) => navigate("/user/products")}
                >
                  All Products
                </Button>
                <Button
                  color="inherit"
                  onClick={(e) => navigate("/user/add-product")}
                >
                  Add Product
                </Button>

                <MenuList />
              </Stack>
            ) : (
              <Button color="inherit" onClick={() => navigate("/user/login")}>
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
