import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/UI/Modal/Modal";
import { refreshActions } from "../../../store/refresh-slice";

const FeaturedProducts = () => {
  const pdtUrl = "http://localhost:5000/api/products";
  const [pdtData, setPdtData] = useState([]);
  const cartItemUrl = "http://localhost:5000/api/cartItems";
  const [cartItemData, setcartItemData] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isSending, setIsSending] = useState(false);
  let cartId = useSelector((state) => state.auth.cartId);
  const products = useSelector((state) => state.category.products);
  const category = useSelector((state) => state.category.selectedCategoryName);
  const categorySelected = useSelector(
    (state) => state.category.categorySelected
  );

  if (!cartId) {
    cartId = localStorage.getItem("cartId");
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const pdtResponse = await axios.get(pdtUrl, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log("pdt", pdtResponse.data);
        setPdtData(pdtResponse.data);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setErrorFound(true);
      }
    };
    !categorySelected && getProducts();
    categorySelected && setPdtData(products);
  }, [products, category, categorySelected]);

  const imgClickHandler = (val) => {
    console.log("val", val);
    navigate(`/detail?Product=${val}`);
  };

  const addToCartHandler = useCallback(async (pdtId) => {
    if (isSending) return;

    setIsSending(true);
    try {
      console.log("Product ID", pdtId);
      const cartItemResponse = await axios.get(`${cartItemUrl}/${cartId}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log("Cart item response data", cartItemResponse.data);
      const cartItemResponseData = cartItemResponse.data;

      //case 1 empty cart
      if (cartItemResponseData.length === 0) {
        console.log("No items in cart till now");
        console.log("Adding first cart item");
        const cartItemToCreate = {
          userId,
          cartId,
          productId: pdtId,
          quantity: 1,
        };
        console.log(cartItemToCreate);
        try {
          const postRequestCartItemResponse = await axios.post(
            cartItemUrl,
            cartItemToCreate,
            { headers: { Authorization: Cookies.get("token") } }
          );
          console.log(
            "Successfully created new product with quanity=1 in cart",
            postRequestCartItemResponse.data
          );
          dispatch(refreshActions.refresh());
        } catch (error) {
          console.log(error);
          setErrorMssg(error.response.data);
          setErrorFound(true);
        }
        setcartItemData(cartItemResponseData);
        return;
      }
      //atleast 1 item exists in cart
      else {
        console.log("Pdt idsss", cartItemResponseData[0].productId._id);
        const pdtIdMatch = cartItemResponseData.some(
          (pdt) => pdt.productId._id === pdtId
        );
        console.log("pdtIdMatch:", pdtIdMatch);
        if (!pdtIdMatch) {
          console.log("Product Id didnt match with any item in cart");
          console.log("Pdt Id:", pdtId);
          const cartItemToCreate = {
            userId,
            cartId,
            productId: pdtId,
            quantity: 1,
          };
          console.log(cartItemToCreate);
          try {
            const postRequestCartItemResponse = await axios.post(
              cartItemUrl,
              cartItemToCreate,
              { headers: { Authorization: Cookies.get("token") } }
            );
            dispatch(refreshActions.refresh());
            console.log(
              "Successfully created new product with quanity=1 in cart",
              postRequestCartItemResponse.data
            );
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setErrorFound(true);
          }
          setcartItemData(...cartItemResponseData);
          return;
        } else if (pdtIdMatch) {
          console.log(
            "Current pdt exists in cart(pdt Id matched with existing item in cart) so lets increase its qty"
          );
          const index = cartItemResponseData.findIndex(
            (pdt) => pdt.productId._id === pdtId
          );
          console.log("index", index);
          const currentCartItemQty = cartItemResponseData[index].quantity;
          console.log("Current qty of the item in cart:", currentCartItemQty);
          const currentCartItemId = cartItemResponseData[index]._id;
          console.log(
            "_id of cartItem which exists in cart",
            currentCartItemId
          );
          const cartItemQtyToIncrease = {
            userId,
            cartId,
            productId: pdtId,
            quantity: currentCartItemQty + 1,
          };
          console.log(cartItemQtyToIncrease);
          try {
            const putRequestCartItemResponse = await axios.put(
              `${cartItemUrl}/${currentCartItemId}`,
              cartItemQtyToIncrease,
              { headers: { Authorization: Cookies.get("token") } }
            );
            dispatch(refreshActions.refresh());
            console.log(
              "Successfully increased qty of item by 1",
              putRequestCartItemResponse.data
            );
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setErrorFound(true);
          }
          setcartItemData(...cartItemResponseData);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
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
        onTitle={"Error!"}
      />
      <div className="row px-xl-5">
        {pdtData.map((pdt, i) => {
          return (
            <div key={i + 1} className="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div className="product-item bg-light mb-4">
                <div
                  className="product-img position-relative overflow-hidden"
                  onClick={() => {
                    imgClickHandler(pdt.name);
                  }}
                >
                  <img
                    className="img-fluid w-100"
                    src={pdt.imageUrl.replaceAll('"', "")}
                    alt=""
                    style={{ width: "100px", height: "450px" }}
                  />
                  <div className="product-action">
                    {isLoggedIn && (
                      <a className="btn btn-outline-dark btn-square">
                        <i
                          className="fa fa-shopping-cart"
                          onClick={() => {
                            addToCartHandler(pdt._id);
                          }}
                        ></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-center py-4">
                  <a className="h6 text-decoration-none text-truncate" href="">
                    {pdtData[i].name}
                  </a>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>${pdtData[i].price}</h5>
                    <h6 className="text-muted ml-2">
                      <del>${(pdtData[i].price + 0.2 * pdtData[i].price).toFixed(2)}</del>
                    </h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mb-1">
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star text-primary mr-1"></small>
                    <small className="fa fa-star-half-alt text-primary mr-1"></small>
                    <small className="far fa-star text-primary mr-1"></small>
                    <small>(99)</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default FeaturedProducts;