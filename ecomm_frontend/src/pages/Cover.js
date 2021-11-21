import React from 'react';
import cover from "../images/cover.jpeg";

const Cover = () => {
    return (
        <div>
      <img src={cover} className="store-image" alt="Supplement Store" />
      <p className="fitnessmania-heading">Welcome to Supplement Store</p>
    </div>
    )
}

export default Cover
