import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ConfirmModal from "../modal/ConfirmModal";
import NoImage from "../../images/noImage.jpg";
import {
  getSingleProductAction,
  deleteProductAction,
} from "../../redux/actions/ProductActions";
import SnackbarComponent from "./SnackbarComponent";
import Loading from "../../images/loading.gif";
import Loader from "../loader/Loader";

export default function SingleProductComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pid } = useParams();

  // All the states for toastbar
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  // states for modal
  const [active, setActive] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  // All the Selectors
  const { singleProduct, isLoading } = useSelector((state) => state?.products);
  const { updateProduct } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getSingleProductAction(pid));
    return () => {};
  }, []);

  useEffect(() => {
    if (updateProduct) {
      setOpen(true);
      if (updateProduct.success) {
        setVariant("success");
        setMessage(updateProduct.message);
      } else if (!updateProduct.success) {
        setVariant("error");
        setMessage(updateProduct.message);
      }
    }
  }, [updateProduct]);

  // Handler for Deleting Product
  const deleteProduct = () => {
    setActive(true);
    dispatch(deleteProductAction(pid, navigate));
    setActive(false);
  };

  // for Closing Modal
  const handleClose = () => {
    setActive(false);
  };

  // for Opening Modal
  const handleOpen = () => {
    setActive(true);
  };
  return (
    <>
      {" "}
      <SnackbarComponent
        open={open}
        onClose={onClose}
        variant={variant}
        message={message}
      />
      <Container sx={{ marginTop: "15vh" }}>
        <div className="containerdivSingle">
          <ConfirmModal
            open={active}
            onClose={handleClose}
            deleteProduct={deleteProduct}
          />
          <Card sx={{ maxWidth: 345 }}>
            {isLoading ? (
              <Loader />
            ) : singleProduct?.data?.image == null ? (
              <CardMedia
                component="img"
                height="220"
                width="300"
                image={NoImage}
              />
            ) : (
              <CardMedia
                component="img"
                height="220"
                width="300"
                image={
                  singleProduct?.data?.image
                    ? `data:image/jpeg;base64,${singleProduct?.data?.image}`
                    : Loading
                }
                alt="img"
              />
            )}

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {singleProduct?.data?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {singleProduct?.data?.description}
              </Typography>
              <Typography variant="h7" color="text.primary">
                {singleProduct?.data?.sku}
              </Typography>
            </CardContent>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ marginBottom: "20px" }}
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleOpen}
              >
                Delete <DeleteIcon />
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ background: "#006289" }}
                onClick={() => navigate(`/user/products/${pid}/update`)}
              >
                Update <EditIcon />
              </Button>
            </Stack>
          </Card>
        </div>
      </Container>
    </>
  );
}
