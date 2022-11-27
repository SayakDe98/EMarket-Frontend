import React from "react";

const OrderTotal = () => {
    return(
        <React.Fragment>
            <div className="bg-light p-30 mb-5">
                    <div className="border-bottom">
                        <h6 className="mb-3">Products</h6>
                        <div className="d-flex justify-content-between">
                            <p>Product Name 1</p>
                            <p>$150</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Product Name 2</p>
                            <p>$150</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Product Name 3</p>
                            <p>$150</p>
                        </div>
                    </div>
                    <div className="border-bottom pt-3 pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>$150</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">$10</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>$160</h5>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
};

export default OrderTotal;