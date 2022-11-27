import React from "react";

const ContactInfo = () => {
  return (
    <React.Fragment>
      <div className="bg-light p-30 mb-3" style={{padding:'22px'}}>
        <p className="mb-2">
          <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street,
          New York, USA
        </p>
        <p className="mb-2">
          <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
        </p>
        <p className="mb-2">
          <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
        </p>
      </div>
    </React.Fragment>
  );
};

export default ContactInfo;
