import React, { useCallback, useEffect, useState } from "react";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import BreadCrumb from "../../components/Detail/BreadCrumb/BreadCrumb";
import Review from "../../components/Detail/Review/Review";
import AdditionalInfo from "../../components/Detail/AdditionalInfo/AdditionalInfo";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import ScrollToTop from "react-scroll-to-top";
import Modal from "../../shared/UI/Modal/Modal";
import { refreshActions } from "../../store/refresh-slice";

const Detail = () => {
  const productUrl = "http://localhost:5000/api/products";
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [getProducts, setGetProducts] = useState([]);
  const [index, setIndex] = useState(0);
  let cartId = useSelector((state) => state.auth.cartId);
  const cartItemUrl = "http://localhost:5000/api/cartItems";
  const searchItem = localStorage.getItem("Search Item");
  console.log("SEARCH ITEM", searchItem);
  const [item, setItem] = useState("");
  const [itemPrice, setItemPrice] = useState(50);
  const [productId, setProductId] = useState("631de962ca0908e68a1010fb");
  const [imageUrl, setImageUrl] = useState("");
  const [qty, setQty] = useState(1);
  const [cartItemData, setcartItemData] = useState([]);
  const [productDescription, setProductDescription] = useState(" show active");
  const [addInfo, setAddInfo] = useState("");
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const userId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [productDescriptionHighlighted, setProductDescriptionHighlighted] =
    useState("active");
  const [addInfoHighlightedHighlighted, setAddInfoHighlighted] = useState("");
  const [reviewHighlighted, setReviewHighlighted] = useState("");
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const refresh = useSelector((state) => state.refresh.refresh);
  if (!cartId) {
    cartId = localStorage.getItem("cartId");
  }

  useEffect(() => {
    const getProductInCart = async () => {
      try {
        const getProductResponse = await axios.get(`${cartItemUrl}/${cartId}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        const getProductResponseData = getProductResponse.data;
        console.log(" Get Product Response Data", getProductResponseData);
        setGetProducts(getProductResponseData);
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setTitle("Error!");
        setErrorFound(true);
      }
    };

    const getSearchItem = async () => {
      try {
        const productResponse = await axios.get(productUrl);
        const productResponseData = productResponse.data;
        console.log("Product Response Data", productResponseData);
        setAllProducts(productResponseData);
        const product = params.get("Product");
        const Item = productResponseData.filter((pdt) => pdt.name == product);
        if (Item.length !== 0) {
          console.log("iTEM Name", Item);
          setItem(Item[0].name);
          setItemPrice(Item[0].price);
          setProductId(Item[0]._id);
          setImageUrl(Item[0].imageUrl);
          return;
        } else {
          console.log("Search Item doesnt exist");
          setItem("Nikon D780");
          setItemPrice(1899);
          setProductId("632062fcd473606d93cf04ec");
          setImageUrl(
            "https://i.rtings.com/assets/products/ve8V3PTW/nikon-d780/design-medium.jpg"
          );
        }
        setProducts(productResponseData);
        return;
      } catch (error) {
        console.log(error);
        setErrorMssg(error.response.data);
        setTitle("Error!");
        setErrorFound(true);
      }
    };

    getSearchItem();
    isLoggedIn && getProductInCart();
  }, [refresh]);

  const changeQtyHandler = useCallback(
    (event) => {
      let Value = parseInt(event.target.value);
      console.log("Value", Value);
      setQty(Value);
      console.log("qty", qty);
    },
    [qty]
  );

  const decreaseQtyByOneHandler = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  const increaseQtyByOneHandler = () => {
    setQty(qty + 1);
  };

  const showPdtDescHandler = () => {
    setProductDescription(" show active");
    setAddInfo("");
    setReview("");
    setProductDescriptionHighlighted(" active");
    setAddInfoHighlighted("");
    setReviewHighlighted("");
  };

  const showAddInfoHandler = () => {
    setAddInfo(" show active");
    setProductDescription("");
    setReview("");
    setProductDescriptionHighlighted("");
    setAddInfoHighlighted(" active");
    setReviewHighlighted("");
  };

  const showReviewHandler = () => {
    setReview(" show active");
    setProductDescription("");
    setAddInfo("");
    setProductDescriptionHighlighted("");
    setAddInfoHighlighted("");
    setReviewHighlighted(" active");
  };

  const addToCartHandler = useCallback(
    async (pdtId) => {
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
            quantity: qty,
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
            const cartItemToCreate = {
              cartId,
              userId,
              productId: pdtId,
              quantity: qty,
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
            console.log(
              "Current qty of the item in cart:",
              parseInt(currentCartItemQty)
            );
            const currentCartItemId = cartItemResponseData[index]._id;
            console.log(
              "_id of cartItem which exists in cart",
              currentCartItemId
            );
            console.log("Quantity added to put request:", qty);
            console.log(
              "Quantity sent to backend via put request:",
              qty + currentCartItemQty
            );
            const cartItemQtyToIncrease = {
              cartId,
              userId,
              productId: pdtId,
              quantity: parseInt(currentCartItemQty) + qty,
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
    },
    [qty]
  );

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

      <BreadCrumb />

      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <img
              className="d-block w-100"
              src={imageUrl.replaceAll('"', "")}
              alt="Product"
            />
          </div>
          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{item}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star-half-alt"></small>
                  <small className="far fa-star"></small>
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">${itemPrice}</h3>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>
              {isLoggedIn && (
                <div className="d-flex align-items-center mb-4 pt-2">
                  <div
                    className="input-group quantity mr-3"
                    style={{ width: "130px" }}
                  >
                    <div
                      className="input-group-btn"
                      onClick={decreaseQtyByOneHandler}
                    >
                      <button className="btn btn-primary btn-minus">
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control bg-secondary border-0 text-center"
                      onChange={changeQtyHandler}
                      value={qty}
                    />
                    <div
                      className="input-group-btn"
                      onClick={increaseQtyByOneHandler}
                    >
                      <button className="btn btn-primary btn-plus">
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary px-3"
                    onClick={() => addToCartHandler(productId)}
                  >
                    <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                  </button>
                </div>
              )}
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className={`nav-item nav-link text-dark ${productDescriptionHighlighted}`}
                  data-toggle="tab"
                  onClick={showPdtDescHandler}
                  style={{ cursor: "pointer" }}
                >
                  Description
                </a>
                <a
                  className={`nav-item nav-link text-dark${addInfoHighlightedHighlighted}`}
                  data-toggle="tab"
                  onClick={showAddInfoHandler}
                  style={{ cursor: "pointer" }}
                >
                  Information
                </a>
                <a
                  className={`nav-item nav-link text-dark${reviewHighlighted}`}
                  data-toggle="tab"
                  onClick={showReviewHandler}
                  style={{ cursor: "pointer" }}
                >
                  Reviews (1)
                </a>
              </div>
              <div className="tab-content">
                <div
                  className={`{tab-pane fade${productDescription}}`}
                  id="tab-pane-1"
                >
                  <h4 className="mb-3">Product Description</h4>
                  <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                    sea. Consetetur vero aliquyam invidunt duo dolores et duo
                    sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                    consetetur invidunt sed sed et, lorem duo et eos elitr,
                    sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed
                    tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing,
                    eos dolores sit no ut diam consetetur duo justo est, sit
                    sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd
                    invidunt tempor lorem, ipsum lorem elitr sanctus eirmod
                    takimata dolor ea invidunt.
                  </p>
                  <p>
                    Dolore magna est eirmod sanctus dolor, amet diam et eirmod
                    et ipsum. Amet dolore tempor consetetur sed lorem dolor sit
                    lorem tempor. Gubergren amet amet labore sadipscing clita
                    clita diam clita. Sea amet et sed ipsum lorem elitr et, amet
                    et labore voluptua sit rebum. Ea erat sed et diam takimata
                    sed justo. Magna takimata justo et amet magna et.
                  </p>
                </div>
                <div className={`tab-pane fade${addInfo}`} id="tab-pane-2">
                  <AdditionalInfo />
                </div>
                <div className={`tab-pane fade${review}`} id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">1 review for {item}</h4>
                      <div className="media mb-4">
                        <div className="media-body">
                          <h6>
                            John Doe
                            <small>
                              {" "}
                              - <i>01 Jan 2045</i>
                            </small>
                          </h6>
                          <div className="text-primary mb-2">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <p>
                            Diam amet duo labore stet elitr ea clita ipsum,
                            tempor labore accusam ipsum et no at. Kasd diam
                            tempor rebum magna dolores sed sed eirmod ipsum.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Review />
                  </div>
                </div>
              </div>
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

export default Detail;
