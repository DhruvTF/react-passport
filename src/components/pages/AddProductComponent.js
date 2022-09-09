import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { TextField, Card, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { addProductAction } from "../../redux/actions/ProductActions";

export default function AddProductComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All the States
  const [fields, setFields] = useState({
    name: "",
    description: "",
    image: "",
    sku: "",
  });

  // Function to Convert to Base64
  const base64Converter = (data) =>
    new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64String);
      };
      reader.onerror = (error) => reject("REject", error);
      reader.readAsDataURL(data);
    });

  // Handler for Fields Change
  const productFieldChangeHandler = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });

    if (e.target.files) {
      base64Converter(e.target.files[0])
        .then((res) => {
          setFields({ ...fields, image: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Handler for Submitting form data
  const addProductHandler = (e) => {
    e.preventDefault();
    if (fields) {
      dispatch(addProductAction(fields, navigate));
    }
  };

  return (
    <div className="centeritem">
      <Card>
        <h2>
          <b>Welcome to the Add Product Page</b>
        </h2>
        <form onSubmit={addProductHandler}>
          <div>
            <TextField
              id="name"
              required
              label="Product Name"
              variant="outlined"
              margin="normal"
              className="fullwidth"
              onChange={productFieldChangeHandler}
              error={fields.name ? false : true}
              helperText={
                !fields.name ? "Please Provide the name of the Product" : "Looks Good"
              }
            />
          </div>
          <div>
            <TextField
              required
              id="description"
              error={fields.description ? false : true}
              label="Product Description"
              variant="outlined"
              margin="normal"
              className="fullwidth"
              onChange={productFieldChangeHandler}
              helperText={
                !fields.description
                  ? "Please Provide the valid description"
                  : "Looks Good"
              }
            />
          </div>
          <div>
            <TextField
              required
              id="sku"
              error={fields.sku ? false : true}
              label="Sku"
              variant="outlined"
              margin="normal"
              className="fullwidth"
              onChange={productFieldChangeHandler}
              helperText={!fields.sku ? "Please Provide the valid sku" : "Looks Good"}
            />
          </div>
          <div>
            <TextField
              // id="img"
              // label="Image"
              variant="outlined"
              margin="normal"
              type="file"
              className="fullwidth"
              inputProps={{ accept: ".jpg,.jpeg,.png" }}
              onChange={productFieldChangeHandler}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<AddCircleOutlineIcon />}
              className="fullwidth"
            >
              <b>Add Product</b>
            </Button>
          </div>
          <div className="linkcontainer">
            <Link to="/user/products"> To All Products </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
