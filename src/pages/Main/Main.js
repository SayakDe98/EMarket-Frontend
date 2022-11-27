import React from "react";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import CarouselCaption from "../../components/Main/Carousel/CarouselCaption";
import OfferTexts from "../../components/Main/Carousel/OfferTexts";
import Categories from "../../components/Main/Categories/Categories";
import CompanyPolicies from "../../components/Main/CompanyPolicies/CompanyPolicies";
import FeaturedProducts from "../../components/Main/FeaturedProducts/FeaturedProducts";
import SpecialOffers from "../../components/Main/SpecialOffers/SpecialOffers";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import "./Main.css";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import BottomCarousel from "../../components/Main/Carousel/BottomCarousel";
import ScrollToTop from "react-scroll-to-top";

const Main = () => {
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

      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <CarouselCaption />
          <OfferTexts />
        </div>
      </div>

      <div className="container-fluid pt-5">
        <CompanyPolicies />
      </div>

      <div className="container-fluid pt-5">
        <Categories />
      </div>

      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <FeaturedProducts />
      </div>

      <div className="container-fluid pt-5 pb-3">
        <SpecialOffers />
      </div>

      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Recent Products</span>
        </h2>
        <FeaturedProducts />
      </div>

      <div className="container-fluid py-5">
        <BottomCarousel />
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

export default Main;
