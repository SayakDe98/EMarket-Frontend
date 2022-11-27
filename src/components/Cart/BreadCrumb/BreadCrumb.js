import React from "react";

const BreadCrumb = () => {
    return(
        <React.Fragment>
            <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="/">Home</a>
                    <a className="breadcrumb-item text-dark" href="/shop">Shop</a>
                    <span className="breadcrumb-item active">Cart</span>
                </nav>
            </div>
        </div>
        </React.Fragment>
    );
};

export default BreadCrumb;