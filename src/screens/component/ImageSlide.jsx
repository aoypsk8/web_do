import React, { useState, useEffect } from "react";

const ImageSlider = ({ images, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div className="overflow-hidden  m-5 bg-slate-200 h-48 rounded-lg">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="w-full h-full object-fill transition-transform duration-500 ease-linear"
      />
    </div>
  );
};

export default ImageSlider;
