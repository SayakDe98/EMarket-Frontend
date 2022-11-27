import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Main from "./pages/Main/Main";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Orders/Checkout";
import Shop from "./pages/Shop/Shop";
import SignUp from "./shared/UI/SignUp/SignUp";
import LogIn from "./shared/UI/LogIn/LogIn";
import { useSelector } from "react-redux";
import Product from "./pages/Product/Product";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import FAQ from "./pages/FAQ/FAQ";
import OrderItems from "./pages/OrderItems/OrderItems";
import UserAddress from "./pages/UserAddress/UserAddress";
import YourOrders from "./pages/YourOrders/YourOrders";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [color, setColor] = useState(
    "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))"
  );
  return (
    <React.Fragment>
      <div style={{ background: `${color}` }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
            {!isLoggedIn && <Route exact path="/signup" element={<SignUp />} />}
            {!isLoggedIn && <Route exact path="/login" element={<LogIn />} />}
            {isLoggedIn && (
              <Route exact path="/address" element={<UserAddress />} />
            )}
            {isLoggedIn && (
              <Route exact path="/product" element={<Product />} />
            )}
            {isLoggedIn && <Route exact path="/cart" element={<Cart />} />}
            {isLoggedIn && (
              <Route exact path="/yourorders" element={<YourOrders />} />
            )}
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/detail" element={<Detail />} />
            {isLoggedIn && (
              <Route exact path="/checkout" element={<Checkout />} />
            )}
            {isLoggedIn && (
              <Route exact path="/cartitems" element={<OrderItems />} />
            )}
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/faqs" element={<FAQ />} />
          </Routes>
        </Router>
      </div>
    </React.Fragment>
  );
};

export default App;