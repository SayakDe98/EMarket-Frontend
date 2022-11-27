import { Card } from "react-bootstrap";
import "./Product.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../shared/UI/Modal/Modal";
import Cookies from "js-cookie";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import ScrollToTop from "react-scroll-to-top";

const Product = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Apparels");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [numberInStock, setNumberInStock] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const productUrl = "http://localhost:5000/api/products";
  const categoryUrl = "http://localhost:5000/api/categories";
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const colorChangeHandler = (event) => {
    setColor(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const qtyChangeHandler = (event) => {
    setNumberInStock(event.target.value);
  };

  const imageUrlChangeHandler = (event) => {
    setImageUrl(event.target.value);
  };
  const submitHandler = async (event) => {
    // debugger;
    event.preventDefault();

    const productAddSuccess = await postData();
    console.log(productAddSuccess);
    if (productAddSuccess) {
      setErrorMssg("Product Created Successfully!");
      setTitle("Success!");
      setErrorFound(true);
      console.log("Product created successfully!");
      setName("");
      setColor("");
      setCategory("");
      setPrice("");
      setNumberInStock("");
      setImageUrl("");
    } else {
      setErrorFound(true);
      console.log(errorFound);
    }
  };

  const postData = async () => {
    try {
      const productData = {
        name,
        category,
        color,
        price,
        numberInStock,
        imageUrl,
      };

      await axios.post(productUrl, productData, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log("Success");
      return true;
    } catch (error) {
      console.log(error);
      console.log("error");
      console.log(Cookies.get("token"));
      setErrorMssg(error.response.data);
      setTitle("Error!");
      return false;
    }
  };
  const errorMessage = () => {
    return errorMssg;
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await axios.get(categoryUrl);
        console.log("Categories response", categoriesResponse);
        const categoriesResponseData = categoriesResponse.data;
        console.log("categories response data", categoriesResponseData);
        setCategories(categoriesResponseData);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="product" style={{ background: "blueViolet" }}>
      <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={title}
      />
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <PrimaryBar />
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <SecondaryBar />
        </div>
      </div>

      <div className="container-fluid bg-dark mb-30">
        <NavBar />
      </div>
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <span className="breadcrumb-item active">Add Product</span>
          </nav>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: "700px", border: "8px solid #FFD333" }}>
          <Modal
            onData={[errorMessage()]}
            show={errorFound}
            setErrorFound={setErrorFound}
            onTitle={"Error"}
          />
          <h1
            style={{
              color: "#FFD333",
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Add New Product
          </h1>
          <form onSubmit={submitHandler} style={{ margin: "1rem" }}>
            <div className="form-group">
              <label className="label">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={nameChangeHandler}
                className="form-control"
                placeholder="Enter Product Name"
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="dropdown">
                Product Category
              </label>
              <select
                style={{ margin: "1rem" }}
                onChange={categoryChangeHandler}
                id="dropdown"
              >
                {categories.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <option value={item.category}>{item.category}</option>
                    </React.Fragment>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Product Color</label>
              <input
                type="text"
                value={color}
                onChange={colorChangeHandler}
                className="form-control"
                placeholder="Enter Product Color"
              />
            </div>
            <div className="form-group">
              <label className="label">Image Url</label>
              <input
                type="text"
                value={imageUrl}
                onChange={imageUrlChangeHandler}
                className="form-control"
                placeholder="Enter Image Url"
              />
            </div>
            <div className="form-group">
              <label className="label">Product Price</label>
              <input
                type="number"
                value={price}
                onChange={priceChangeHandler}
                className="form-control"
                placeholder="Enter Product Price"
              />
            </div>
            <div className="form-group">
              <label className="label">Quantity</label>
              <input
                type="number"
                value={numberInStock}
                onChange={qtyChangeHandler}
                className="form-control"
                placeholder="Enter Number Of Products To Be Added To Stock"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{ margin: "1rem" }}
              >
                Submit
              </button>
            </div>
          </form>
        </Card>
      </div>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Product;