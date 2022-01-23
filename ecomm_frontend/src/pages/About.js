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
              Nowadays there is lot of duplicate supplements in market, and
              surprisingly many gym owners also give fake supplements to their
              clients. Our aim is to give original supplements to out customers,
              as our first priority is the quality of products which we are
              selling. At our store you will get 100 percent genuine products,
              as for us your health matters a lot.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
