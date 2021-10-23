import React, { useState } from "react";
import ProductItem from "../components/ProductItem";
import data from "../data";

const Products = () => {

  const [product,setProduct] = useState(data);

  return (
    <div>
      {product.map((item)=>{
          return (
            <ProductItem key={item.id} item={item}/>
          )
      })}
    </div>
  );
};

export default Products;
