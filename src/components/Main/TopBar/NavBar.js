import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import "./NavBar.css";
import Modal from "../../../shared/UI/Modal/Modal";
import { categoryActions } from "../../../store/category-slice";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const logInState = useSelector((state) => state.auth.isLoggedIn);
  const cartItemsUrl = "http://localhost:5000/api/cartItems";
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const categoriesUrl = "http://localhost:5000/api/categories";
  const [categories, setCategories] = useState([]);
  const [activeHome, setActiveHome] = useState("");
  const [activeProduct, setActiveProduct] = useState("");
  const [activeShop, setActiveShop] = useState("");
  const [activeDetail, setActiveDetail] = useState("");
  const [activeOrderItems, setActiveOrderItems] = useState("");
  const [activeContact, setActiveContact] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const dispatch = useDispatch();
  let currentPath = window.location.href;
  console.log("Current path", currentPath);
  const cartId = localStorage.getItem("cartId");
  const refresh = useSelector((state) => state.refresh.refresh);

  useEffect(() => {
    if (currentPath === "http://localhost:3000/") {
      setActiveHome("active");
    } else if (currentPath === "http://localhost:3000/product") {
      setActiveProduct("active");
    } else if (currentPath === "http://localhost:3000/shop") {
      setActiveShop("active");
    } else if (currentPath === "http://localhost:3000/detail") {
      setActiveDetail("active");
    } else if (currentPath === "http://localhost:3000/orderitems") {
      setActiveOrderItems("active");
    } else if (currentPath === "http://localhost:3000/contact") {
      setActiveContact("active");
    }
    const numberOfCartItems = async () => {
      try {
        const cartItemResponse = await axios.get(`${cartItemsUrl}/${cartId}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        const cartItemResponseData = cartItemResponse.data;
        console.log("Cart item response data", cartItemResponseData);
        let noOfcartItems = 0;
        cartItemResponseData.map((item) => (noOfcartItems += item.quantity));
        console.log("Qty", noOfcartItems);
        setNumberOfCartItems(noOfcartItems);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };

    const categoriesHandler = async () => {
      try {
        const categoriesResponse = await axios.get(categoriesUrl);
        const categoriesResponseData = categoriesResponse.data;
        console.log("Categories response data", categoriesResponseData);
        setCategories(categoriesResponseData);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };

    {
      isLoggedIn && numberOfCartItems();
    }
    categoriesHandler();
  }, [refresh]);

  const onCategoryClickHandler = async (category) => {
    try {
      const categoryResponse = await axios.get(`${categoriesUrl}/${category}`);
      console.log("category response data on click", categoryResponse.data);
      let catProductsResponseData = categoryResponse.data;
      dispatch(
        categoryActions.filterProducts({
          products: catProductsResponseData,
          selectedCategoryName: category,
        })
      );
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setErrorFound(true);
    }
  };

  const errorMessage = () => {
    return errorMssg;
  };
  return (
    <React.Fragment>
      <Modal
        onData={errorMessage()}
        show={errorFound}
        setErrorFound={setErrorFound}
        onTitle={"Error!"}
      />
      <div className="row px-xl-5" style={{ position: "relative" }}>
        <Dropdown>
          <div className="col-lg-3 d-none d-lg-block">
            <DropdownToggle>
              <a
                className=" d-flex align-items-center justify-content-between w-100"
                data-toggle="collapse"
                style={{
                  height: "55px",
                  paddingBottom: "0.5rem",
                  paddingRight: "0.4rem",
                  paddingLeft: "0.4rem",
                }}
              >
                <h6 className="text-dark m-0">
                  <i className="fa fa-bars mr-2"></i>Categories
                </h6>
                <i className="fa fa-angle-down text-dark"></i>
              </a>
            </DropdownToggle>
            <DropdownMenu>
              {categories.map((ctg) => {
                return (
                  <DropdownItem
                    onClick={() => onCategoryClickHandler(ctg.category)}
                    style={{
                      backgroundColor: "#FFD333",
                      border: "0.5px solid black",
                    }}
                  >
                    {ctg.category}
                  </DropdownItem>
                );
              })}
              <DropdownItem
                onClick={() => {
                  dispatch(categoryActions.getAllProducts());
                }}
                style={{
                  backgroundColor: "#FFD333",
                  border: "0.5px solid black",
                }}
              >
                All
              </DropdownItem>
            </DropdownMenu>
          </div>
        </Dropdown>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <div className="text-decoration-none d-block d-lg-none">
              <span className="h1 text-uppercase text-dark bg-light px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                Shop
              </span>
            </div>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                  className={`nav-item nav-link ${activeHome}`}
                >
                  Home
                </a>
                {isLoggedIn && (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/product")}
                    className={`nav-item nav-link ${activeProduct}`}
                  >
                    Add Product
                  </a>
                )}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className={`nav-item nav-link ${activeShop}`}
                >
                  Shop
                </a>
                {isLoggedIn && (
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cartitems")}
                    className={`nav-item nav-link ${activeOrderItems}`}
                  >
                    Cart Items
                  </a>
                )}

                <Dropdown>
                  <DropdownToggle>
                    <a
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      style={{
                        height: "55px",
                        padding: "0.8rem",
                        color: "black",
                      }}
                    >
                      Pages <i className="fa fa-angle-down mt-1"></i>
                    </a>
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      <>
                        <DropdownItem
                          style={{
                            backgroundColor: "#FFD333",
                            border: "0.5px solid black",
                          }}
                          onClick={() => navigate("/")}
                        >
                          Home
                        </DropdownItem>
                        {logInState && (
                          <DropdownItem
                            style={{
                              backgroundColor: "#FFD333",
                              border: "0.5px solid black",
                            }}
                            onClick={() => navigate("/product")}
                          >
                            Add Product
                          </DropdownItem>
                        )}
                        <DropdownItem
                          style={{
                            backgroundColor: "#FFD333",
                            border: "1px solid black",
                          }}
                          onClick={() => navigate("/shop")}
                        >
                          Shop
                        </DropdownItem>
                        <DropdownItem
                          style={{
                            backgroundColor: "#FFD333",
                            border: "0.5px solid black",
                          }}
                          onClick={() => navigate("/contact")}
                        >
                          Contact
                        </DropdownItem>
                      </>
                    }
                  </DropdownMenu>
                </Dropdown>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/contact");
                  }}
                  className={`nav-item nav-link ${activeContact}`}
                >
                  Contact
                </a>
              </div>
              {logInState && (
                <div
                  className="navbar-nav ml-auto py-0 d-none d-lg-block"
                  style={{ position: "relative", left: "15rem" }}
                >
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/cart");
                    }}
                    className="btn px-0 ml-3"
                  >
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      {numberOfCartItems}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
