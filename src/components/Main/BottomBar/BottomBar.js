import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/UI/Modal/Modal";

const BottomBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [submitDone, setSubmitDone] = useState(false);
  const [successMssg, setSuccessMssg] = useState("");

  const successMessage = () => {
    return "Successfully Opted to Newsletter";
  };

  return (
    <React.Fragment>
      <Modal
        onData={successMessage()}
        show={submitDone}
        setErrorFound={setSubmitDone}
        onTitle={"Success!"}
      />
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">
            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et
            et dolor sed dolor. Rebum tempor no vero est magna amet no
          </p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>123
            Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
              <div className="d-flex flex-column justify-content-start">
                <a
                  className="text-secondary mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Home
                </a>
                <a
                  className="text-secondary mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/shop")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Shop
                </a>
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/product")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Add Product
                  </a>
                )}
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cart")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Cart
                  </a>
                )}
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cartitems")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Cart Items
                  </a>
                )}
                <a
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/contact")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
              <div className="d-flex flex-column justify-content-start">
                <a
                  className="text-secondary mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Home
                </a>
                <a
                  className="text-secondary mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/shop")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Shop
                </a>
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/product")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Add Product
                  </a>
                )}
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cart")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Cart
                  </a>
                )}
                {isLoggedIn && (
                  <a
                    className="text-secondary mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/cartitems")}
                  >
                    <i className="fa fa-angle-right mr-2"></i>Cart Items
                  </a>
                )}
                <a
                  className="text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/contact")}
                >
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
              <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setSuccessMssg("Form Submitted successfully");
                        setSubmitDone(true);
                        console.log("Form submitted successfully");
                      }}
                      className="btn btn-primary"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BottomBar;
