import React from "react";
import SliderImg from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../images/slide1.jpg"
import slide2 from "../images/slide2.jpg"
import slide3 from "../images/slide3.jpg"

export default function Slider() {

const settings = {
  dots: false,
  arrwos: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
 
};

  return (
    <div className="slider">
        <SliderImg {...settings}>
      <div>
        <img src={slide1} alt="cat1" />
      </div>
      <div>
        <img src={slide2} alt="cat2" />
      </div>
      <div>
        <img src={slide3} alt="cat3" />
      </div>
    </SliderImg>
    </div>
  );
}


