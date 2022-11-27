import React from "react";
import BreadCrumb from "../../components/Contact/BreadCrumb/BreadCrumb";
import ContactInfo from "../../components/Contact/ContactInfo/ContactInfo";
import ContactUs from "../../components/Contact/ContactUs/ContactUs";
import Dresses from "../../components/Contact/Dresses/Dresses";
import Map from "../../components/Contact/Map/Map";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import ScrollToTop from "react-scroll-to-top";

const Contact = () => {
    return(
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
    <div className="container-fluid bg-dark mb-30">
        <Dresses />
    </div>

    <div className="container-fluid">
       <BreadCrumb />
    </div>

    <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
        <div className="row px-xl-5">
        <ContactUs />
        <div className="col-lg-5 mb-5">
               <Map />
               <ContactInfo />
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

export default Contact;