import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/auth-slice";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./LogIn.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "../Modal/Modal";
import { useCookies } from "react-cookie";
import ScrollToTop from "react-scroll-to-top";
import PrimaryBar from "../../../components/Main/TopBar/PrimaryBar";
import BottomBar from "../../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../../components/Main/BottomBar/BottomNavBar";
import Cookies from "js-cookie";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookies] = useCookies("token", "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUrl = "http://localhost:5000/api/login";
  const cartUrl = "http://localhost:5000/api/carts";
  const [errorFound, setErrorFound] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const addressUrl = "http://localhost:5000/api/userAddresses";

  let cartId;
  let userid;
  const postData = async () => {
    try {
      const loginData = {
        email,
        password,
      };
      const response = await axios.post(loginUrl, loginData);
      console.log("Success");
      console.log(response.data.token);
      setCookies("token", response.data.token);
      console.log("User id", response.data._id);
      userid = response.data._id;
      console.log(userid);
      localStorage.setItem("userId", userid);
      try {
        const cartResponse = await axios.get(cartUrl, {
          headers: { Authorization: response.data.token },
        });
        console.log(cartResponse.data);
        const cartData = cartResponse.data.filter(
          (cart) => cart.userId === userid
        );
        cartId = cartData;
        console.log(cartId[0]._id); //we should only see a signle cart, so we should make an api where we get cart data with help of userID
      } catch (error) {
        console.log(error);
      }
      return true;
    } catch (error) {
      console.log(error);
      console.log("error");
      setErrorMssg(error.response.data);
      return false;
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const logInSuccess = await postData();
    console.log(logInSuccess);
    if (logInSuccess) {
      console.log("Log In successful!");
      dispatch(authActions.loggedIn({ cartId: cartId[0]._id }));
      try {
        let userId = localStorage.getItem("userId");
        const getAddressesResponse = await axios.get(
          `${addressUrl}/user/${userId}`,
          { headers: { Authorization: Cookies.get("token") } }
        );
        console.log(
          "getAddressResponseDataId",
          getAddressesResponse.data[0]._id
        );
        localStorage.setItem("addrId", getAddressesResponse.data[0]._id);
      } catch (error) {
        console.log(error);
      }
      navigate("/");
    } else {
      setErrorFound(true);
      console.log(errorFound);
    }
  };

  const errorMessage = () => {
    return errorMssg;
  };

  return (
    <div
      style={{
        backgroundImage: "url('img/login3.jpg')",
        backgroundSize: "90%",
      }}
    >
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <PrimaryBar />
        </div>
      </div>

      <MDBContainer fluid>
        <Modal
          onData={errorMessage()}
          show={errorFound}
          setErrorFound={setErrorFound}
          onTitle={"Error"}
        />
        <form onSubmit={submitHandler}>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "500px" }}
              >
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <h2 className="fw-bold mb-2 text-center">Log In</h2>
                  <p className="text-white-50 mb-3">
                    Please enter your login and password!
                  </p>
                  <label>Email Address</label>
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlLg1"
                    type="email"
                    size="lg"
                    onChange={emailChangeHandler}
                  />
                  <label>Password</label>
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    id="formControlLg2"
                    type="password"
                    size="lg"
                    onChange={passwordChangeHandler}
                  />

                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className="mb-4"
                    label="Remember password"
                  />

                  {
                    <Stack spacing={2} direction="row">
                      <Button
                        className="login"
                        variant="contained"
                        style={{
                          border: "none",
                          backgroundColor: "#FFD333",
                          color: "black",
                          fontWeight: "100",
                        }}
                        type="submit"
                      >
                        Log In
                      </Button>
                    </Stack>
                  }

                  <hr className="my-4" />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </div>
  );
};

export default LogIn;
