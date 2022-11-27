import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const YouMayAlsoLike = () => {
  const productUrl = "http://localhost:5000/api/products";
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const products = async () => {
      try {
        const productResponse = await axios.get(productUrl, {
          headers: { Authorization: Cookies.get("token") },
        });
        const productResponseData = productResponse.data;
        console.log("Product Response data", productResponseData);
        setProduct(productResponseData);
      } catch (error) {
        console.log(error);
      }
    };
    products();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid py-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">You May Also Like</span>
        </h2>
        <div className="row px-xl-5">
          <div className="col">
            <div className="owl-carousel related-carousel">
              {product.map((pdt, i) => {
                return (
                  <div className="product-item bg-light">
                    <div className="product-img position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        src={`img/product-${i + 1}.jpg`}
                        alt=""
                      />
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <a className="h6 text-decoration-none text-truncate">
                        {pdt.name}
                      </a>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>${pdt.price}</h5>
                        <h6 className="text-muted ml-2">
                          <del>${pdt.price + pdt.price * 0.2}</del>
                        </h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default YouMayAlsoLike;
