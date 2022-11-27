import React from "react";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";

const FAQ = () => {
  return (
    <React.Fragment>
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
        <h1 style={{ color: "#FFD333" }}>Frequently Asked Questions</h1>
        <ol
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <li style={{ color: "white", margin: "0.5rem" }}>
            What is the return policy?
          </li>
          <p style={{ color: "#FFD333" }}>
            Place a return request in the Contacts page.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            What are the shipping options?
          </li>
          <p style={{ color: "#FFD333" }}>
            The shipping options are : Flight and Delivery Van.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            What are the international taxes, duties, etc. that I have to pay?
          </li>
          <p style={{ color: "#FFD333" }}>
            We have shipping charges of $10 that's it.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            When will I receive my order?
          </li>
          <p style={{ color: "#FFD333" }}>
            You will be informed when your order is placed successfully
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            What do I do if I never received my order?
          </li>
          <p style={{ color: "#FFD333" }}>
            In such a case please contact us via the Contacts page.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            What do I do if I received a defective order?
          </li>
          <p style={{ color: "#FFD333" }}>
            Plese tell us about it in the Help page.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            How do I make changes to an order I’ve already placed?
          </li>
          <p style={{ color: "#FFD333" }}>
            Please contact us in the Contacts page.
          </p>
          <li style={{ color: "white", margin: "0.5rem" }}>
            Where are you located?
          </li>
          <p style={{ color: "#FFD333" }}>
            We are currently located in all over USA. We have outlets in New
            York, Los Angeles, Chicago, Boston, San Diego, San Francisco and
            Seattle.
          </p>
        </ol>
      </div>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
};

export default FAQ;