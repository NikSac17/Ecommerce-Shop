import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
    setLoading(false);
    setProducts(json);
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map((item) => {
        return item.category;
      })
    ),
  ];

  const brands = [
    "All",
    ...new Set(
      products.map((item) => {
        return item.brand;
      })
    ),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex bd-highlight">
      <div className="p-2 flex-shrink-1 bd-highlight my-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="Search"
            rows="1"
            name="name"
            value={search}
            minLength={3}
            required
            onChange={(e) => setSearch(e.target.value)}
          ></textarea>
        </form>
        <h5>Category</h5>
        <div>
          {categories.map((category) => {
            return (
              <div>
                <button className="btn">{category}</button>
              </div>
            );
          })}
        </div>

        <div>
          <h5>Brand</h5>
          {brands.map((brand) => {
            return (
              <div>
                <button className="btn">{brand}</button>
              </div>
            );
          })}
        </div>
        <button className="btn btn-danger">Clear Filters</button>
      </div>
      <div className="p-2 w-100 bd-highlight">
        <div className="row my-3">
          {loading && <Loading />}
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
      </div>
    </div>
  );
};

export default Products;
