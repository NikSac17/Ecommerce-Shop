import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
  title,
  description,
  image,
  category,
  size,
  price,
  brand,
  shipping,
  available,
}) => {
  return (
    <div className="container col-md-3 my-3">
      <div className="row mb-2">
        <div>
          <Link
            to={{
              pathname: "/productDetails",
              state: {
                title,
                description,
                image,
                category,
                size,
                price,
                brand,
                shipping,
                available,
              },
            }}
          >
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col-auto d-none d-lg-block">
                <img
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  src={image}
                  alt="Loading Soon..."
                />
              </div>
              <p className="mb-0">{title}</p>
              <p className="mb-0">Rs {price}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
