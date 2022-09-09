import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Card, Grid, Box, Container } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Loader from "../../components/loader/Loader";
import NoImage from "../../images/noImage.jpg";
import { getAllProductAction } from "../../redux/actions/ProductActions";
import SnackbarComponent from "./SnackbarComponent";

export default function AllProductsComponent() {
  const dispatch = useDispatch();

  // All the States
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  // All the Selectors
  const { data, last_page } = useSelector(
    (state) => state?.products?.allProducts
  );
  const { isLoading } = useSelector((state) => state?.products);
  const { addProduct } = useSelector((state) => state?.products);
  const { singleProduct } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getAllProductAction(page));
  }, [page]);

  useEffect(() => {
    if (singleProduct.success && singleProduct.message) {
      setOpen(true);
      setVariant("success");
      setMessage(singleProduct.message);
    } else if (!singleProduct.success && singleProduct.message) {
      setOpen(true);
      setVariant("error");
      setMessage(singleProduct.message);
    }
  }, [singleProduct]);

  useEffect(() => {
    if (addProduct.success && addProduct.message) {
      setOpen(true);
      setVariant("success");
      setMessage(addProduct.message);
    } else if (!addProduct.success && addProduct.message) {
      setOpen(true);
      setVariant("error");
      setMessage(addProduct.message);
    }
  }, [addProduct]);

  // Handler for changing page
  const pageChangeHandler = (e, value) => {
    setPage(parseInt(e.target.textContent));
  };

  return (
    <>
      <SnackbarComponent
        open={open}
        onClose={onClose}
        variant={variant}
        message={message}
      />

      <Container maxWidth="lg">
        {isLoading ? (
          <Loader />
        ) :data?.length === ""|| data?.length !== null ||
          data?.length !== undefined ||
          data?.length !== 0 ? (
          <Box sx={{ flexGrow: 1, margin: "100px 0px" }}>
            <Grid container spacing={2}>
              {data?.map((product) => (
                <Grid item lg={3} md={6} xs={12} key={product?.id}>
                  <Link to={`/user/products/${product?.id}`} className="link">
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={
                          product?.image
                            ? `data:image/jpeg;base64,${product?.image}`
                            : NoImage
                        }
                        alt="img"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {product?.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Stack justifyContent="center" alignItems="center" mt={2}>
              {last_page ?<Pagination
                count={last_page}
                color="primary"
                onClick={pageChangeHandler}
                hideNextButton={true}
                hidePrevButton={true}
                page={page}
              /> : null}
            </Stack>
          </Box>
        ) : (
          <div>No Products to show</div>
        )}
      </Container>
    </>
  );
}
