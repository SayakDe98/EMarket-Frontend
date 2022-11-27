import React from "react";
import { useNavigate } from "react-router-dom";

const SpecialOffers = () => {
  const navigate = useNavigate();
  const shopNavigateHandler = () => {
    navigate("/shop");
  };
  return (
    <React.Fragment>
      <div className="row px-xl-5">
        <div className="col-md-6">
          <div className="product-offer mb-30" style={{ height: "300px" }}>
            <img className="img-fluid" src="img/offer-1.jpg" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a onClick={shopNavigateHandler} className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-offer mb-30" style={{ height: "300px" }}>
            <img className="img-fluid" src="img/offer-2.jpg" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a
                style={{ cursor: "pointer" }}
                onClick={shopNavigateHandler}
                className="btn btn-primary"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SpecialOffers;
