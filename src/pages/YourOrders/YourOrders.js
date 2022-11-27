import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import Modal from "../../shared/UI/Modal/Modal";

const YourOrders = () => {
  const userId = localStorage.getItem("userId");
  const ordersUrl = `http://localhost:5000/api/orders/user/${userId}`;
  const [orders, setOrders] = useState([]);
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersResponse = await axios.get(ordersUrl, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log("orders response data", ordersResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };
    getOrders();
  }, []);

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
            <span className="breadcrumb-item active">Your Orders</span>
          </nav>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {orders.length > 0 && (
          <Card sx={{ maxWidth: 25 }} style={{ backgroundColor: "blueviolet" }}>
            <ListGroup>
              {orders.map((order, i) => {
                return (
                  <ListGroup.Item
                    style={{
                      margin: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ width: "80px" }}
                      src={order.productId.imageUrl.replaceAll('"', "")}
                    />
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Name: {order.productId.name}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Quantity: {order.totalAmount / order.productId.price}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Amount: ${order.totalAmount}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Date: {new Date(order.orderDate).toString()}
                    </p>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        )}
      </div>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
};

export default YourOrders;
