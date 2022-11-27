import React from "react";
import BreadCrumb from "../../components/Cart/BreadCrumb/BreadCrumb";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";
import CartTableBody from "../../components/Cart/CartTableBody/CartTableBody";
import CartTableHeader from "../../components/Cart/CartTableHeader/CartTableHeader";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";

const Cart = () => {
    return(
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

        <div className="container-fluid">
            <BreadCrumb />
        </div>

        <div className="container-fluid">
            <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover text-center mb-0">
                        <CartTableHeader />
                        <CartTableBody />
                    </table>
                </div>
                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                    <CartSummary />
                </div>
            </div>
        </div>

        <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
            <BottomBar />
            <BottomNavBar />
        </div>


        <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>

    </React.Fragment>
    );
};

export default Cart;