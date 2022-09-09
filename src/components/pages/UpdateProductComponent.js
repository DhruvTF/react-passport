import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { TextField, Card, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { getSingleProductAction } from "../../redux/actions/ProductActions";
import { updateProductAction } from "../../redux/actions/ProductActions";

export default function UpdateProductComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pid } = useParams();

  // All selectors
  const singleProduct = useSelector((state) => state?.products?.singleProduct);

  useEffect(() => {
    dispatch(getSingleProductAction(pid));
  }, []);

  // Fields States
  const [fields, setFields] = useState({
    name: singleProduct?.data?.name,
    description: singleProduct?.data?.description,
    image: singleProduct?.data?.image,
    sku: singleProduct?.data?.sku,
  });

  // To Convert to base 64
  const bs64Converter = (data) =>
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

  // Fields Change Handler
  const productFieldChangeHandler = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });

    if (e.target.files) {
      bs64Converter(e.target.files[0])
        .then((res) => {
          setFields({ ...fields, image: res });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Handler for Submitting form
  const updateHandler = (e) => {
    e.preventDefault();
    if (fields.name && fields.description && fields.sku) {
      dispatch(updateProductAction(fields, pid, navigate));
    }
  };

  return (
    <>
      <div className="centeritem">
        <Card>
          <form onSubmit={updateHandler} noValidate>
            <div>
              <TextField
                id="name"
                required
                variant="outlined"
                margin="normal"
                className="fullwidth"
                value={fields.name}
                onChange={productFieldChangeHandler}
                error={fields.name ? false : true}
                helperText={
                  !fields.name ? "Please Provide the name of the Product" : ""
                }
              />
            </div>
            <div>
              <TextField
                required
                id="description"
                error={fields.description ? false : true}
                variant="outlined"
                margin="normal"
                value={fields.description}
                className="fullwidth"
                onChange={productFieldChangeHandler}
                helperText={
                  !fields.description
                    ? "Please Provide the valid description"
                    : ""
                }
              />
            </div>

            <div>
              <TextField
                required
                id="sku"
                value={fields.sku}
                error={fields.sku ? false : true}
                variant="outlined"
                margin="normal"
                className="fullwidth"
                onChange={productFieldChangeHandler}
                helperText={!fields.sku ? "Please Provide the valid sku" : ""}
              />
            </div>
            <div>
              <TextField
                id="Image"
                type="file"
                variant="outlined"
                margin="normal"
                className="fullwidth"
                onChange={productFieldChangeHandler}
              />
            </div>
            <div>
              {" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<EditIcon />}
                className="fullwidth"
              >
                Update Product
              </Button>
            </div>
          </form>
          <div className="linkcontainer">
            <Link to="/user/products"> To All Products </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
