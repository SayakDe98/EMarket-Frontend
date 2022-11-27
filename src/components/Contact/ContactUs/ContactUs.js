import React, { useState } from "react";
import Modal from "../../../shared/UI/Modal/Modal";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMssg, setSuccessMssg] = useState("");
  const [submitDone, setSubmitDone] = useState(false);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const successMessage = () => {
    return successMssg;
  };

  return (
    <React.Fragment>
      <Modal
        onData={successMessage()}
        show={submitDone}
        setErrorFound={setSubmitDone}
        onTitle={"Success!"}
      />
      <div className="col-lg-7 mb-5">
        <div className="contact-form bg-light p-30">
          <div id="success"></div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSuccessMssg("Form Submitted successfully");
              setSubmitDone(true);
              console.log("Form Submitted");
              setName("");
              setEmail("");
              setMessage("");
              setSubject("");
            }}
          >
            <div className="control-group">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={nameChangeHandler}
                id="name"
                placeholder="Your Name"
                required="required"
                data-validation-required-message="Please enter your name"
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="control-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={emailChangeHandler}
                id="email"
                placeholder="Your Email"
                required="required"
                data-validation-required-message="Please enter your email"
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="control-group">
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={subjectChangeHandler}
                id="subject"
                placeholder="Subject"
                required="required"
                data-validation-required-message="Please enter a subject"
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="control-group">
              <textarea
                className="form-control"
                value={message}
                onChange={messageChangeHandler}
                rows="8"
                id="message"
                placeholder="Message"
                required="required"
                data-validation-required-message="Please enter your message"
              ></textarea>
              <p className="help-block text-danger"></p>
            </div>
            <div>
              <button className="btn btn-primary py-2 px-4" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
