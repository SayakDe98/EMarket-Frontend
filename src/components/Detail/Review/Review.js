import React, { useState } from "react";
import Modal from "../../../shared/UI/Modal/Modal";
import { Rating } from "react-simple-star-rating";

const Review = () => {
  const [errorMssg, setErrorMssg] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const onSubmitHandler = () => {
    setErrorMssg("Your review was sent successfully!");
    setTitle("Success!");
    setErrorFound(true);
  };

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
      <div className="col-md-6">
        <h4 className="mb-4">Leave a review</h4>
        <small>
          Your email address will not be published. Required fields are marked *
        </small>
        <div className="d-flex my-3">
          <p className="mb-0 mr-2">Your Rating :</p>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            size={20}
            label
            transition
            fillColor="#FFD333"
            emptyColor="gray"
            className="foo"
          >
            {rating}
          </Rating>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="message">Your Review </label>
            <textarea
              id="message"
              cols="30"
              rows="5"
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="name">Your Name </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group mb-0">
            <input
              onClick={(event) => {
                event.preventDefault();
                onSubmitHandler();
              }}
              type="submit"
              defaultValue="Leave Your Review"
              className="btn btn-primary px-3"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Review;
