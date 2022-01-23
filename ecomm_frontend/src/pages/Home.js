import React, { useEffect, useState } from "react";
import img1 from "../images/1.jpeg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

const END_POINT="http://localhost:5000";

const Home = () => {
  var [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const response = await fetch(`${END_POINT}/api/products/getAllItems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setLoading(false);
    shuffle(json);
    setProducts(json.slice(0,4));
    console.log(products);
  };

  const shuffle=(array)=>{
    array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Believe you can and you</h5>
              <p>are halfway there.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Passion Matters</h5>
              <p>Hunger Matters.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Always have vision</h5>
              <p>
                <h6>Patience is the only key to success.</h6>
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="p-2 w-100 bd-highlight">
        <div className="row my-1">
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

      {/* <div className="row my-3">
        {products.slice(-4).map((element) => {
          const { _id, imgUrl1, imgUrl2, heading, description, points, timestamp } = element;
          return (
            <ProductItem
              key={_id}
              imgUrl1={imgUrl1}
              imgUrl2={imgUrl2}
              heading={heading}
              description={description}
              points={points}
              date={timestamp}
            />
          );
        })}
      </div> */}

    </>
  );
};

export default Home;
