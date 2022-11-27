import React, { useState, useEffect, useReducer } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import PrimaryBar from "../../../components/Main/TopBar/PrimaryBar";
import BottomBar from "../../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../../components/Main/BottomBar/BottomNavBar";
import Modal from "../Modal/Modal";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  return { val: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  return { val: "", isValid: false };
};

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [title, setTitle] = useState("");
  const postDataUrl = "http://localhost:5000/api/signup";
  const cartCreationUrl = "http://localhost:5000/api/carts";
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    val: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid && name);
    }, 500);
    return () => {
      console.log("Cleanup function");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, name]);

  const postData = async () => {
    try {
      const registerData = {
        name,
        email: emailState.value,
        password: passwordState.value,
      };
      const serverResponse = await axios.post(postDataUrl, registerData);
      try {
        const cartData = { userId: serverResponse.data._id };
        await axios.post(cartCreationUrl, cartData, {
          headers: { Authorization: serverResponse.data.token },
        });
        console.log("Cart creation successful!");
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setTitle("Error");
        setErrorFound(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error");
      setErrorFound(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    postData();
    setName("");
    passwordState.value = "";
    emailState.value = "";
    setErrorMssg("Successfully Registered User!");
    setTitle("Success!");
    setErrorFound(true);
    console.log("Successfully Registered User!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const errorMessage = () => {
    return errorMssg;
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/signup1.jpg')",
        backgroundSize: "90%",
      }}
    >
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
      </div>
      <MDBContainer fluid className="p-4">
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              The best offer <br />
              <span className="text-primary">for your business</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <label>Name</label>
                <MDBInput
                  wrapperClass="mb-4"
                  value={name}
                  onChange={nameChangeHandler}
                  id="form1"
                  type="text"
                />

                <label>E-Mail</label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form3"
                  value={emailState.value}
                  onChange={emailChangeHandler}
                  type="email"
                />
                <label>Password</label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form4"
                  type="password"
                  value={passwordState.value}
                  onChange={passwordChangeHandler}
                />

                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>

                {
                  <Stack spacing={2} direction="row">
                    <Button
                      className="signup"
                      variant="contained"
                      style={{
                        backgroundColor: "#FFD333",
                        color: "black",
                        fontWeight: "100",
                        border: "none",
                      }}
                      onClick={submitHandler}
                      disabled={!formIsValid}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                }
                <div className="text-center">
                  <p style={{ margin: "1rem" }}>or Sign Up with:</p>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </div>
  );
};

export default SignUp;
