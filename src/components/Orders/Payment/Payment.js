import React from "react";

const Payment = () => {
    return(
        <React.Fragment>
             <div className="bg-light p-30">
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="paypal"/>
                                <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="directcheck"/>
                                <label className="custom-control-label" htmlFor="directcheck">Direct Check</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="banktransfer"/>
                                <label className="custom-control-label" htmlFor="banktransfer">Bank Transfer</label>
                            </div>
                        </div>
                        <button className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                    </div>
        </React.Fragment>
    );
};

export default Payment;