import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:5000/api/products/getAllItems",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    setProducts(json);
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row my-3">
      {products.length === 0 && "No products to display"}
      {products.map((element) => {
        const {
          _id,
          title,
          description,
          image,
          category,
          size,
          price,
          brand,
          shipping,
          available,
        } = element;
        return (
          <ProductItem
            key={_id}
            title={title}
            description={description}
            image={image}
            category={category}
            size={size}
            price={price}
            brand={brand}
            shipping={shipping}
            available={available}
          />
        );
      })}
    </div>
  );
};

export default Products;
