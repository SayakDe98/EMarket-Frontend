import { InputLabel } from "@material-ui/core";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import Modal from "../../shared/UI/Modal/Modal";

const Help = () => {
  const [submitDone, setSubmitDone] = useState(false);
  const [successMssg, setSuccessMssg] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const successMessage = () => {
    return successMssg;
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <React.Fragment>
      <Modal
        onData={successMessage()}
        show={submitDone}
        setErrorFound={setSubmitDone}
        onTitle={"Success!"}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#FFD333" }}>How Can We Help?</h1>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            setSuccessMssg("Feedback Sent");
            setSubmitDone(true);
            console.log("Feedback sent");
            setEmail("");
            setText("");
          }}
        >
          <InputLabel
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            Describe the problem you are facing
          </InputLabel>
          <textarea
            value={text}
            onChange={textChangeHandler}
            style={{ backgroundColor: "mediumblue", color: "#FFD333" }}
            rows="4"
            cols="50"
          />
          <InputLabel
            style={{
              margin: "0.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            Please Provide Your Email
          </InputLabel>
          <input
            value={email}
            onChange={emailChangeHandler}
            type="email"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "mediumblue",
              color: "#FFD333",
              width: "-webkit-fill-available",
            }}
          ></input>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" style={{ margin: "1rem" }}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
};

export default Help;
