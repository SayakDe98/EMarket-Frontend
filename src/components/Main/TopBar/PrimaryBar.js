import React, { useState } from "react";
import "./PrimaryBar.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { Link, useNavigate } from "react-router-dom";

const PrimaryBar = () => {
  const menuItems = ["About", "Contact", "Help", "FAQs"];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.loggedIn());
    navigate("/");
  };

  const addressHandler = () => {
    navigate("/address");
  };
  const yourOrdersHandler = () => {
    navigate("/yourorders");
  };
  const logInPage = () => {
    navigate("/login");
  };

  const signUpPage = () => {
    navigate("/signup");
  };

  return (
    <React.Fragment>
      <div className="col-lg-6 d-none d-lg-block">
        <div className="d-inline-flex align-items-center h-100">
          {menuItems.map((item) => {
            return (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                key={item}
                className="text-body mr-3"
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
      <div className="col-lg-6 text-center text-lg-right">
        <div className="d-inline-flex align-items-center">
          {!isLoggedIn && (
            <div className="btn-group">
              <button
                className="btn btn-sm btn-light"
                onClick={logInPage}
                style={{ margin: "0.5rem" }}
              >
                Login
              </button>
              <button
                className="btn btn-sm btn-light"
                onClick={signUpPage}
                style={{ margin: "0.5rem" }}
              >
                Sign Up
              </button>
            </div>
          )}
          {isLoggedIn && (
            <div className="btn-group">
              <Dropdown>
                <DropdownToggle
                  className="btn btn-sm btn-light dropdown-toggle"
                  style={{ margin: "0.5rem" }}
                >
                  My Account
                </DropdownToggle>
                <DropdownMenu>
                  {
                    <>
                      <DropdownItem
                        style={{ backgroundColor: "#FFD333" }}
                        onClick={addressHandler}
                      >
                        Addresses
                      </DropdownItem>
                      <DropdownItem
                        style={{ backgroundColor: "#FFD333" }}
                        onClick={yourOrdersHandler}
                      >
                        Your Orders
                      </DropdownItem>
                      <DropdownItem
                        style={{ backgroundColor: "#FFD333" }}
                        onClick={logoutHandler}
                      >
                        Log Out
                      </DropdownItem>
                    </>
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="d-inline-flex align-items-center d-block d-lg-none">
          <a href="" className="btn px-0 ml-2">
            <i className="fas fa-heart text-dark"></i>
            <span
              className="badge text-dark border border-dark rounded-circle"
              style={{ paddingBottom: "2px" }}
            >
              0
            </span>
          </a>
          <a href="" className="btn px-0 ml-2">
            <i className="fas fa-shopping-cart text-dark"></i>
            <span
              className="badge text-dark border border-dark rounded-circle"
              style={{ paddingBottom: "2px" }}
            >
              0
            </span>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrimaryBar;