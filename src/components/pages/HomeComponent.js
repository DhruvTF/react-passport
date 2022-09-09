import React from "react";
import { Link } from "react-router-dom";

import { Container, Stack, Typography } from "@mui/material";

import "../../styles/styles.css";
import Background from "../../images/background.jpg";

export default function Home() {
  return (
    <>
      <div className="homeroot">
        <img src={Background} alt="background_img" className="background" />

        <Container className="homepage_container">
          <Stack alignItems="flex-end" spacing={2} mt={10}>
            <Typography variant="h3">Welcome To</Typography>
            <Typography variant="h3">React Passport</Typography>
          </Stack>
          <Stack alignItems="flex-end" spacing={1} mt={5}>
            <Link to="/user/login" className="link">
              Existing Customer? Click here to login!!!
            </Link>
            <Link to="/user/register" className="link">
              To register Please click here
            </Link>
          </Stack>
        </Container>
      </div>
    </>
  );
}
