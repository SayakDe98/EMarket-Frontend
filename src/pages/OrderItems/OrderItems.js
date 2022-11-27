import axios from "axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Form } from "react-bootstrap";
import { Card, FormControlLabel, Radio } from "@mui/material";
import Modal from "../../shared/UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../../store/refresh-slice";
import { useNavigate } from "react-router-dom";
import "./OrderItems.css";

const OrderItems = () => {
  const orderItemsUrl = "http://localhost:5000/api/orderItems";
  const [orderItems, setOrderItems] = useState([]);
  const buyNowUrl = "http://localhost:5000/api/buynow";
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [state, setState] = useState("");
  const [addressData, setAddressData] = useState([]);
  const [getAddress, setGetAddress] = useState(true);
  const [addAddress, setAddAddress] = useState(false);
  const addressUrl = "http://localhost:5000/api/userAddresses";
  const userId = localStorage.getItem("userId");
  const addrId = localStorage.getItem("addrId");
  const [currAddr, setCurrAddr] = useState(localStorage.getItem("addrId"));
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh);
  const getOrderItems = async () => {
    try {
      const orderItemsResponse = await axios.get(`${orderItemsUrl}/${userId}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log("Order Items Response", orderItemsResponse);
      const orderItemsResponseData = orderItemsResponse.data;
      console.log("order items response data", orderItemsResponseData);
      let otid = [
        ...new Set(
          orderItemsResponse.data.map((item) => item.orderedTogetherId)
        ),
      ];
      console.log("ordered together id", otid);
      let oirud = await getCartItems(otid);
      Promise.all(oirud).then((val) => setOrderItems(val));
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
  };
  const getCartItems = async (otid) => {
    return otid.map(async (otid) => {
      try {
        const orderItemsResponseUsingOtid = await axios.get(
          `${orderItemsUrl}/get/${otid}`,
          { headers: { Authorization: Cookies.get("token") } }
        );
        console.log("order items using otid", orderItemsResponseUsingOtid);
        console.log(
          "order items data using otid",
          orderItemsResponseUsingOtid.data
        );
        return orderItemsResponseUsingOtid.data;
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setTitle("Error!");
        setErrorFound(true);
      }
    });
  };
  const getAddresses = async () => {
    try {
      const getAddressesResponse = await axios.get(
        `${addressUrl}/user/${userId}`,
        { headers: { Authorization: Cookies.get("token") } }
      );
      console.log("getAddressResponseData", getAddressesResponse.data);
      setAddressData(getAddressesResponse.data);
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
  };
  useEffect(() => {
    getOrderItems();
    getAddresses();
  }, [refresh]);
  const addrCheckHandler = (addId) => {
    localStorage.setItem("addrId", addId);
    dispatch(refreshActions.refresh());
  };

  const buyNowHandler = useCallback(async (orderedTogetherId) => {
    try {
      const userAddressId = localStorage.getItem("addrId");
      const userId = localStorage.getItem("userId");
      if (!userAddressId) {
        console.log("Please add an address");
        setErrorMssg("Please add an address to deliver product(s)");
        setTitle("Error!");
        setErrorFound(true);
      } else if (!userId) {
        console.log("User id absent");
        setErrorMssg("User Id absent");
        setTitle("Error!");
        setErrorFound(true);
      }
      const buyNowData = { userId, userAddressId, orderedTogetherId };
      const buyNowResponse = await axios.post(buyNowUrl, buyNowData, {
        headers: { Authorization: Cookies.get("token") },
      });
      dispatch(refreshActions.refresh());
      setErrorMssg("Successfully bought item");
      setTitle("Success!");
      setErrorFound(true);
      console.log("Successfully bought item", buyNowResponse);
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
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
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="/">
                Home
              </a>
              <a className="breadcrumb-item text-dark" href="/shop">
                Shop
              </a>
              <span className="breadcrumb-item active">Cart Items</span>
            </nav>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "3rem" }}>
        {/* <div > */}
        <div style={{ margin: "1rem" }}>
          {getAddress && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: "#FFD333" }}>Billing Address</h1>
              <Card sx={{ minWidth: 275 }}>
                <ListGroup>
                  {addressData.map((add) => {
                    return (
                      <ListGroup.Item
                        style={{ cursor: "pointer" }}
                        onClick={() => addrCheckHandler(add._id)}
                      >
                        Address: <b>{add.addressLine1}</b>
                        <p>
                          <b>{add.addressLine2}</b>
                        </p>
                        <p>City: {add.city}</p>
                        <p>State: {add.state}</p>
                        <p>Pincode: {add.pincode}</p>
                        <FormControlLabel
                          value="address"
                          control={
                            <Radio
                              value={"address"}
                              checked={
                                localStorage.getItem("addrId") === add._id
                                  ? true
                                  : false
                              }
                            />
                          }
                          onClick={() => addrCheckHandler(add._id)}
                        />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            margin: "1rem",
            marginLeft: "1rem",
            width: "600px",
          }}
        >
          <h1 style={{ color: "#FFD333" }}>Cart Items</h1>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {orderItems.length > 0 && (
              <Card
                sx={{ minWidth: 275 }}
                style={{ backgroundColor: "blueViolet" }}
              >
                <div>
                  {/* <ListGroup style={{display:'flex',flexDirection:'row'}}> */}
                  <ListGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "1rem",
                    }}
                  >
                    <>
                      {orderItems.map((item, i) => {
                        return (
                          <div style={{ display: "flex" }}>
                            <h4 style={{ color: "#FFD333" }}>Cart {i + 1}</h4>
                            {item &&
                              item.length &&
                              item.map((pdt) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      margin: "1rem",
                                      borderRadius: "50px",
                                    }}
                                  >
                                    <ListGroup.Item
                                      className="li_item"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flexWrap: "wrap",
                                        minWidth: "auto",
                                      }}
                                    >
                                      {/* <p>{pdt.orderedTogetherId}</p> */}
                                      <div
                                        className="cart_item"
                                        onClick={() =>
                                          navigate(
                                            `/detail?Product=${pdt.productId.name}`
                                          )
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <img
                                          style={{ maxWidth: "100px" }}
                                          src={pdt.productId.imageUrl.replaceAll(
                                            '"',
                                            ""
                                          )}
                                        />
                                        <p>
                                          <b>Name: {pdt.productId.name}</b>
                                        </p>
                                        <p>Quantity: {pdt.quantity}</p>
                                        <p>Price: {pdt.productId.price}</p>
                                        <p>
                                          Total Price:{" "}
                                          {pdt.quantity * pdt.productId.price}
                                        </p>
                                        {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'1rem'}}>

                            <Button onClick={()=>{buyNowHandler(pdt._id,pdt.quantity,pdt.productId.price,pdt.productId._id,pdt.orderedTogetherId)}}>Checkout</Button>
</div> */}
                                      </div>
                                    </ListGroup.Item>
                                  </div>
                                );
                              })}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem",
                              }}
                            >
                              <Button
                                onClick={() => {
                                  buyNowHandler(item[i].orderedTogetherId);
                                }}
                              >
                                Checkout
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  </ListGroup>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
};

export default OrderItems;
