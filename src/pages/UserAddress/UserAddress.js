import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import ListGroup from "react-bootstrap/ListGroup";
import Cookies from "js-cookie";
import axios from "axios";
import { Card, FormControlLabel, Radio } from "@mui/material";
import Modal from "../../shared/UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../../store/refresh-slice";
import { useNavigate } from "react-router-dom";

const UserAddress = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [state, setState] = useState("");
  const [addressData, setAddressData] = useState([]);
  const [getAddress, setGetAddress] = useState(true);
  const [addAddress, setAddAddress] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const addressUrl = "http://localhost:5000/api/userAddresses";
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh);
  const navigate = useNavigate();

  const addLine1ChangeHandler = (event) => {
    setAddressLine1(event.target.value);
  };
  const addLine2ChangeHandler = (event) => {
    setAddressLine2(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };
  const pincodeChangeHandler = (event) => {
    setPincode(event.target.value);
  };

  useEffect(() => {
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
    getAddresses();
  }, [refresh]);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const userAddressData = {
        userId,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      };
      const userAddressResponse = await axios.post(
        addressUrl,
        userAddressData,
        { headers: { Authorization: Cookies.get("token") } }
      );

      console.log("Address created successfully!", userAddressResponse.data);
      dispatch(refreshActions.refresh());
      setErrorMssg("New Address Successfully Added!");
      setTitle("Success!");
      setErrorFound(true);
      localStorage.setItem("addrId", userAddressResponse.data._id);
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }

    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPincode("");
  };
  const addrCheckHandler = (addId) => {
    localStorage.setItem("addrId", addId);
    dispatch(refreshActions.refresh());
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
            <a
              className="breadcrumb-item text-dark"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </a>
            <span className="breadcrumb-item active">Address</span>
          </nav>
        </div>
      </div>

      {addAddress && (
        <Button
          style={{ margin: "1rem", marginLeft: "3rem" }}
          onClick={() => {
            setGetAddress(true);
            setAddAddress(false);
          }}
        >
          Show Address
        </Button>
      )}

      {addAddress && (
        <Form
          onSubmit={onSubmitHandler}
          style={{ backgroundColor: "whitesmoke", margin: "3rem" }}
        >
          <Form.Group style={{margin:'1rem'}}className="mb-3" controlId="formGridAddress1">
            <Form.Label style={{marginTop:'1rem'}}>Address</Form.Label>
            <Form.Control
              value={addressLine1}
              onChange={addLine1ChangeHandler}
              placeholder="1234 Main St"
            />
          </Form.Group>

          <Form.Group style={{margin:'1rem'}} className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control
              value={addressLine2}
              onChange={addLine2ChangeHandler}
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>

          <Row  className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label style={{marginLeft:"1rem"}}>City</Form.Label>
              <Form.Control style={{marginLeft:'1rem'}} value={city} onChange={cityChangeHandler} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>State</Form.Label>
              <Form.Control value={state} onChange={stateChangeHandler} />
            </Form.Group>

            <Form.Group style={{marginRight:'1rem'}} as={Col} controlId="formGridZip">
              <Form.Label >Pincode</Form.Label>
              <Form.Control  value={pincode} onChange={pincodeChangeHandler} />
            </Form.Group>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button style={{margin:'1rem'}} variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}

      {getAddress && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#FFD333" }}>Addresses</h1>
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
                      value="addressId"
                      control={
                        <Radio
                          value={"addressId"}
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
          {getAddress && (
            <Button
              style={{ margin: "1rem" }}
              onClick={() => {
                setAddAddress(true);
                setGetAddress(false);
              }}
            >
              Add New Address
            </Button>
          )}
        </div>
      )}

      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>
    </React.Fragment>
  );
};

export default UserAddress;