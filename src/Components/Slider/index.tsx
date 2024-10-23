import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { ImCross } from "react-icons/im";

interface SliderProps {
  images: any;
  setImageSlider: any;
}
const Slider = ({ images, setImageSlider }: SliderProps) => {
  const [counter, setCounter] = useState(0);

  const nextSlide = () => {
    if (counter < images.length - 1) {
      setCounter(counter + 1);
    }
  };

  const prevSlide = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <div id="main">
        <div id="wrapper">
          <div className="cross-btn cursor-pointer">
            <ImCross
              size={12}
              className="slider-cross-icon"
              onClick={() => setImageSlider(false)}
            />
          </div>
          <button className="active" id="prev" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <div id="image-container">
            <div
              id="image-carousel"
              style={{ transform: `translateX(-${counter * 100}%)` }}
            >
              {images.map((src: any, index: any) => (
                <img
                  key={index}
                  src={src}
                  alt=""
                  style={{ left: `${index * 100}%` }}
                />
              ))}
            </div>
          </div>
          <button className="active" id="next" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
