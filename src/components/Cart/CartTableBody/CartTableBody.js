import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Modal from "../../../shared/UI/Modal/Modal";
import { refreshActions } from "../../../store/refresh-slice";

const CartTableBody = () => {
  const cartItemsUrl = "http://localhost:5000/api/cartItems";
  const [cartData, setCartData] = useState([]);
  const pdtUrl = "http://localhost:5000/api/products";
  const [pdtData, setPdtData] = useState([]);
  const [cartItemData, setcartItemData] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [cartItemQty, setCartItemQty] = useState();
  const [errorFound, setErrorFound] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");
  const [title, setTitle] = useState("");
  const refresh = useSelector((state) => state.refresh.refresh);
  const dispatch = useDispatch();
  let cartId = useSelector((state) => state.auth.cartId);
  if (!cartId) {
    cartId = localStorage.getItem("cartId");
  }
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getCartItemsData = async () => {
      try {
        const cartItemsResponse = await axios.get(`${cartItemsUrl}/${cartId}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log("Cart Items Response Data:", cartItemsResponse.data);
        setCartData(cartItemsResponse.data);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setTitle("Error!");
        setErrorFound(true);
      }
    };

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
        setTitle("Error!");
        setErrorFound(true);
      }
    };
    getProducts();
    getCartItemsData();
  }, [refresh]);

  const addToCartHandler = useCallback(async (pdtId) => {
    if (isSending) return;

    setIsSending(true);
    try {
      console.log("Product ID", pdtId);
      const cartItemResponse = await axios.get(`${cartItemsUrl}/${cartId}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log("Cart item response data", cartItemResponse.data);
      const cartItemResponseData = cartItemResponse.data;

      //case 1 empty cart
      if (cartItemResponseData.length === 0) {
        console.log("No items in cart till now");
        console.log("Adding first cart item");
        const cartItemToCreate = {
          cartId,
          userId,
          productId: pdtId,
          quantity: 1,
        };
        console.log(cartItemToCreate);
        try {
          const postRequestCartItemResponse = await axios.post(
            cartItemsUrl,
            cartItemToCreate,
            { headers: { Authorization: Cookies.get("token") } }
          );
          setErrorMssg("Successfully Added New Product To Cart");
          setTitle("Success!");
          setErrorFound(true);
          console.log(
            "Successfully created new product with quanity=1 in cart",
            postRequestCartItemResponse.data
          );
          // window.location.reload();
          dispatch(refreshActions.refresh());
        } catch (error) {
          console.log(error);
          setErrorMssg(error.response.data);
          setTitle("Error!");
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
            cartId,
            userId,
            productId: pdtId,
            quantity: 1,
          };
          console.log(cartItemToCreate);
          try {
            const postRequestCartItemResponse = await axios.post(
              cartItemsUrl,
              cartItemToCreate,
              { headers: { Authorization: Cookies.get("token") } }
            );
            dispatch(refreshActions.refresh());
            setErrorMssg("Successfully Added New Product To Cart");
            setTitle("Success!");
            setErrorFound(true);
            console.log(
              "Successfully created new product with quanity=1 in cart",
              postRequestCartItemResponse.data
            );
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setTitle("Error!");
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
            cartId,
            userId,
            productId: pdtId,
            quantity: currentCartItemQty + 1,
          };
          console.log(cartItemQtyToIncrease);
          try {
            const putRequestCartItemResponse = await axios.put(
              `${cartItemsUrl}/${currentCartItemId}`,
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
            setTitle("Error!");
            setErrorFound(true);
          }
          setcartItemData(...cartItemResponseData);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
  }, []);

  const removeFromCartHandler = useCallback(async (pdtId, cartItemId) => {
    console.log("Product Id", pdtId);
    try {
      const removeCartItemResponse = await axios.get(
        `${cartItemsUrl}/${cartId}`,
        { headers: { Authorization: Cookies.get("token") } }
      );
      const removeCartItemResponseData = removeCartItemResponse.data;
      console.log("Cart item response data", removeCartItemResponseData);

      console.log("Pdt idsss", removeCartItemResponseData[0].productId._id);
      const removePdtIdMatch = removeCartItemResponseData.some(
        (pdt) => pdt.productId._id === pdtId
      );
      console.log("pdtIdMatch:", removePdtIdMatch);
      if (removePdtIdMatch) {
        console.log(
          "Current pdt exists in cart(pdt Id matched with existing item in cart) so lets increase its qty"
        );
        const removeIndex = removeCartItemResponseData.findIndex(
          (pdt) => pdt.productId._id === pdtId
        );
        console.log("index", removeIndex);
        const currentRemoveCartItemQty =
          removeCartItemResponseData[removeIndex].quantity;
        console.log(
          "Current qty of the item in cart:",
          currentRemoveCartItemQty
        );
        const currentRemoveCartItemId =
          removeCartItemResponseData[removeIndex]._id;
        console.log(
          "_id of cartItem which exists in cart",
          currentRemoveCartItemId
        );
        if (currentRemoveCartItemQty > 1) {
          const cartItemQtyToDecrease = {
            cartId,
            userId,
            productId: pdtId,
            quantity: currentRemoveCartItemQty - 1,
          };
          console.log(cartItemQtyToDecrease);
          try {
            const putRemoveRequestCartItemResponse = await axios.put(
              `${cartItemsUrl}/${currentRemoveCartItemId}`,
              cartItemQtyToDecrease,
              { headers: { Authorization: Cookies.get("token") } }
            );
            dispatch(refreshActions.refresh());

            console.log(
              "Successfully decreased qty of item by 1",
              putRemoveRequestCartItemResponse.data
            );
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setTitle("Error!");
            setErrorFound(true);
          }
          setcartItemData(...removeCartItemResponseData);
          return;
        } else {
          try {
            const itemDeletedFromCartResponse = await axios.delete(
              `${cartItemsUrl}/${cartItemId}`,
              { headers: { Authorization: Cookies.get("token") } }
            );
            dispatch(refreshActions.refresh());

            console.log(itemDeletedFromCartResponse);
          } catch (error) {
            console.log(error);
            setErrorMssg(error.response.data);
            setTitle("Error!");
            setErrorFound(true);
          }
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
  }, []);

  const deleteFromCartHandler = useCallback(async (cartItemId) => {
    try {
      const deletedFromCartResponse = await axios.delete(
        `${cartItemsUrl}/${cartItemId}`,
        { headers: { Authorization: Cookies.get("token") } }
      );
      setTitle("Success!");
      setErrorMssg("Product Removed from cart successfully!");
      setErrorFound(true);
      dispatch(refreshActions.refresh());
      console.log(deletedFromCartResponse);
    } catch (error) {
      console.log(error);
      setErrorMssg(error.response.data);
      setTitle("Error!");
      setErrorFound(true);
    }
    return;
  }, []);

  const setQtyHandler = (event) => {
    if (event.target.value > 0) {
      setCartItemQty(event.target.value);
    }
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
      <tbody className="align-middle">
        {cartData.map((cartItemData, i) => {
          return (
            <>
              <tr key={i + 1}>
                <td key={Math.random()} className="align-middle">
                  <img
                    key={Math.random()}
                    src={cartItemData.productId.imageUrl.replaceAll('"', "")}
                    alt=""
                    style={{ width: "50px" }}
                  />
                  {cartItemData.productId.name}
                </td>
                <td key={Math.random()} className="align-middle">
                  ${cartItemData.productId.price}
                </td>
                <td key={Math.random()} className="align-middle">
                  <div
                    key={Math.random()}
                    className="input-group quantity mx-auto"
                    style={{ width: "100px" }}
                  >
                    <div key={Math.random()} className="input-group-btn">
                      <button
                        className="btn btn-sm btn-primary btn-minus"
                        onClick={() => {
                          removeFromCartHandler(
                            cartItemData.productId._id,
                            cartItemData._id
                          );
                        }}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      disabled
                      key={Math.random()}
                      type="text"
                      className="form-control form-control-sm bg-secondary border-0 text-center"
                      defaultValue={cartItemData.quantity}
                      value={cartItemQty}
                      onChange={setQtyHandler}
                    />
                    <div key={Math.random()} className="input-group-btn">
                      <button
                        className="btn btn-sm btn-primary btn-plus"
                        onClick={() => {
                          addToCartHandler(cartItemData.productId._id);
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>

                <td key={Math.random()} className="align-middle">
                  ${cartItemData.quantity * cartItemData.productId.price}
                </td>
                <td key={Math.random()} className="align-middle">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      deleteFromCartHandler(cartItemData._id);
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </React.Fragment>
  );
};

export default CartTableBody;
