import React from "react";
import aboutImage from "../images/about.jpeg";

const About = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row featurette d-flex justify-content-center align-items-center">
          <div className="col-md-5">
            <img
              className="img-fluid"
              data-src="holder.js/400x400/auto"
              alt="400x400"
              src={aboutImage}
              data-holder-rendered="true"
            />
          </div>
          <div className="col-md-7 ">
            <h1 className="featurette-heading">Our Story</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              atque ea autem soluta ducimus dolores maiores saepe. Iure magnam
              iusto architecto ad provident pariatur quaerat asperiores,
              suscipit nam nulla quo consectetur ab minima dolorum doloribus,
              fuga minus cupiditate. Est dolore consequuntur earum blanditiis
              doloribus debitis molestias consectetur quod quaerat quas?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
