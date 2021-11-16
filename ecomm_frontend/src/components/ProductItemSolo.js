import React, { useState } from "react";
import { useLocation,useHistory } from "react-router-dom";

const ProductItemSolo = () => {
  const location = useLocation();
  let history = useHistory();

  let [counter, setCounter] = useState(1);

  const decrease = () => {
    if (counter >= 1) {
      setCounter(counter--);
    }
  };

  const increase = () => {
    setCounter(counter++);
  };

  const addToCart = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch("http://localhost:5000/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: location.state.image,
          title: location.state.title,
          price: location.state.price,
          quantity: counter,
          subtotal: counter * location.state.price,
        }),
      });
      const json = await response.json();
    }
    else{
      alert("Login/Signup First")
    }
  };

  return (
    <div>
      <div className="row featurette d-flex justify-content-center align-items-center my-5">
        <div className="col-md-5">
          <img
            className="img-fluid"
            data-src="holder.js/400x400/auto"
            alt="400x400"
            src={location.state.image}
            data-holder-rendered="true"
          />
        </div>
        <div className="col-md-7">
          <h2 className="featurette-heading">{location.state.title}</h2>
          <h3 className="text-muted">Rs {location.state.price}</h3>
          <p className="lead">{location.state.description}</p>
          <p>
            <b>Size : </b>
            {location.state.size}
          </p>
          <p>
            <b>Brand : </b>
            {location.state.brand}
          </p>
          <p>
            <b>Shipping : </b>
            {location.state.shipping === 0
              ? "No shipping charges"
              : `Shipping charges: ${location.state.shipping}`}
          </p>
          <p>
            <b>Available : </b>
            {location.state.available ? "Yes" : "N0"}
          </p>
          <button className="btn btn-primary mx-2" onClick={decrease}>
            -
          </button>
          <button className="counter">{counter}</button>
          <button className="btn btn-primary mx-2" onClick={increase}>
            +
          </button>
          <div className="col-md-2 my-5">
            <button className="btn btn-primary" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSolo;
