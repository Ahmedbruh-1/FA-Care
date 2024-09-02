import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          FA Clinics is a state-of-the-art facility dedicated to providing you
          and your loved ones with comprehensive healthcare services with
          compassion and expertise. Our team of skilled doctors and staff are
          committed to treating you with total compassion and delivering
          personalized care tailored to each patient’s needs. At FA Clinics, we
          prioritize your well-being and ensure a beautiful and healthy journey
          towards your optimal health and wellness.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector"/>
        </span>
      </div>
    </div>
  );
};

export default Hero;
