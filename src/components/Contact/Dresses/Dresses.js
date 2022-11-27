import React from "react";

const Dresses = () => {
  return (
    <React.Fragment>
      <nav
        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
        id="navbar-vertical"
        style={{ width: "calc(100% - 30px)", zIndex: "999" }}
      >
        <div className="navbar-nav w-100">
          <div className="nav-item dropdown dropright">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              Dresses <i className="fa fa-angle-right float-right mt-1"></i>
            </a>
            <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
              <a href="" className="dropdown-item">
                Men's Dresses
              </a>
              <a href="" className="dropdown-item">
                Women's Dresses
              </a>
              <a href="" className="dropdown-item">
                Baby's Dresses
              </a>
            </div>
          </div>
          <a href="" className="nav-item nav-link">
            Shirts
          </a>
          <a href="" className="nav-item nav-link">
            Jeans
          </a>
          <a href="" className="nav-item nav-link">
            Swimwear
          </a>
          <a href="" className="nav-item nav-link">
            Sleepwear
          </a>
          <a href="" className="nav-item nav-link">
            Sportswear
          </a>
          <a href="" className="nav-item nav-link">
            Jumpsuits
          </a>
          <a href="" className="nav-item nav-link">
            Blazers
          </a>
          <a href="" className="nav-item nav-link">
            Jackets
          </a>
          <a href="" className="nav-item nav-link">
            Shoes
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Dresses;
