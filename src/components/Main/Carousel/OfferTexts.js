import React from "react";
import { useNavigate } from "react-router-dom";

const OfferTexts = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="col-lg-4">
        <div className="product-offer mb-30" style={{ height: "228px" }}>
          <img className="img-fluid" src="img/offer-1.jpg" alt="" />
          <div className="offer-text">
            <h6 className="text-white text-uppercase">Save 20%</h6>
            <h3 className="text-white mb-3">Special Offer</h3>
            <a onClick={() => navigate("/shop")} className="btn btn-primary">
              Shop Now
            </a>
          </div>
        </div>
        <div className="product-offer mb-30" style={{ height: "228px" }}>
          <img className="img-fluid" src="img/offer-2.jpg" alt="" />
          <div className="offer-text">
            <h6 className="text-white text-uppercase">Save 20%</h6>
            <h3 className="text-white mb-3">Special Offer</h3>
            <a onClick={() => navigate("/shop")} className="btn btn-primary">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OfferTexts;
