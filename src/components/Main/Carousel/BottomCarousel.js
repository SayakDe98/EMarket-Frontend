import React from "react";
import Carousel from "react-bootstrap/Carousel";

const BottomCarousel = () => {
  const imgNumber = [1, 2];
  return (
    <React.Fragment>
      <div className="row px-xl-5">
        <div className="col">
          <Carousel
            style={{ paddingLeft: "4rem" }}
            indicators={false}
            prevLabel=""
            nextLabel=""
          >
            {imgNumber.map((i) => {
              return (
                <Carousel.Item>
                  <img
                    src={`img/vendor-${i}.jpg`}
                    alt="Vendor image"
                    width="200px"
                  />
                  <img
                    src={`img/vendor-${i + 1}.jpg`}
                    width="200px"
                    alt="Vendor image"
                  />
                  <img
                    src={`img/vendor-${i + 2}.jpg`}
                    width="200px"
                    alt="Vendor image"
                  />
                  <img
                    src={`img/vendor-${i + 3}.jpg`}
                    width="200px"
                    alt="Vendor image"
                  />
                  <img
                    src={`img/vendor-${i + 4}.jpg`}
                    width="200px"
                    alt="Vendor image"
                  />
                  <img
                    src={`img/vendor-${i + 5}.jpg`}
                    width="200px"
                    alt="Vendor image"
                  />
                  <img
                    src={`img/vendor-${i + 6}.jpg`}
                    alt="Vendor image"
                    width="200px"
                  />
                  <img
                    src={`img/vendor-${i + 7}.jpg`}
                    alt="Vendor image"
                    width="200px"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BottomCarousel;
