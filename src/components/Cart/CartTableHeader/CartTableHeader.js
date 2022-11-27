import React from "react";

const CartTableHeader = () => {
    return(
        <React.Fragment>
            <thead className="thead-dark">
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
        </React.Fragment>
    );
};

export default CartTableHeader;