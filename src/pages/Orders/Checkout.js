import React from "react";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import BillingAddress from "../../components/Orders/BillingAddress/BillingAddress";
import BreadCrumb from "../../components/Orders/BreadCrumb/BreadCrumb";
import OrderTotal from "../../components/Orders/OrderTotal/OrderTotal";
import Payment from "../../components/Orders/Payment/Payment";
import ShippingAddress from "../../components/Orders/ShippingAddress/ShippingAddress";

const Checkout2 = () => {
  return (
    <React.Fragment>
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

      <BreadCrumb />

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Billing Address</span>
            </h5>
            <BillingAddress />
            <ShippingAddress />
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <OrderTotal />
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <Payment />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
      </div>

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </React.Fragment>
  );
};

export default Checkout2;
