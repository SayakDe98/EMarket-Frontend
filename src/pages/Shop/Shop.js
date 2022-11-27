import React from "react";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import BreadCrumb from "../../components/Shop/BreadCrumb/BreadCrumb";
import Products from "../../components/Shop/Products/Products";
import ScrollToTop from "react-scroll-to-top";

const Shop = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
      <div></div>
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
          <div className="col-lg-12 col-md-8">
            <div className="row pb-4">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="ml-2"></div>
                </div>
              </div>
              <Products />
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

export default Shop;