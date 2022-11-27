import React from "react";

const BottomNavBar = () => {
  return (
    <React.Fragment>
      <div
        className="row border-top mx-xl-5 py-4"
        style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
      >
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-secondary">
            &copy;{" "}
            <a className="text-primary" href="#">
              Domain
            </a>
            . All Rights Reserved. Designed by
            <a className="text-primary" href="https://htmlcodex.com">
              HTML Codex
            </a>
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="img/payments.png" alt="" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BottomNavBar;
