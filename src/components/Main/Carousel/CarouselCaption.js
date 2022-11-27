import React from "react";
import { Button, CarouselItem } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const CarouselCaption = () => {
  const iterate = ["Men's Fashion", "Women's Fashion", "Kids Fashion"];
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="col-lg-8">
        <Carousel indicators={false} prevLabel="" nextLabel="" fade>
          {iterate.map((txt, i) => {
            return (
              <CarouselItem>
                <img
                  src={`img/carousel-${i + 1}.jpg`}
                  style={{ width: "100%" }}
                ></img>
                <Carousel.Caption
                  style={{
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ color: "White", cursor: "default" }}>{txt}</h1>
                  <p>{`Check out our apparels in Shop to stay updated with ${txt} `}</p>
                  <Button
                    onClick={() => {
                      navigate("/shop");
                    }}
                  >
                    Shop Now
                  </Button>
                </Carousel.Caption>
              </CarouselItem>
            );
          })}
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default CarouselCaption;
