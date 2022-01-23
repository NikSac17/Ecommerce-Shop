import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

const END_POINT="http://localhost:5000";

const Products = () => {
  var [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getProducts = async () => {
    const response = await fetch(
      `${END_POINT}/api/products/getAllItems`,
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
    console.log(products);
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

  const filterCategory=(category)=>{
     console.log(category);
     products=products.filter(product=>product.category===category);
     console.log(products,category);
     return products;
  }

  const filterBrand=(brand)=>{
    console.log(brand);
  }

  const clearFilter=()=>{
    
  }

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
            onChange={(e) => setSearch(e.target.value)}
          ></textarea>
        </form>
        <h5>Categories</h5>
        <div>
          {categories.map((category) => {
            return (
              <div>
                <button className="btn" onClick={()=>filterCategory(category)}>{category}</button>
              </div>
            );
          })}
        </div>

        <div>
          <h5>Brands</h5>
          {brands.map((brand) => {
            return (
              <div>
                <button className="btn" onClick={()=>filterBrand(brand)}>{brand}</button>
              </div>
            );
          })}
        </div>
        <button className="btn btn-danger" onClick={()=>clearFilter()}>Clear Filters</button>
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
