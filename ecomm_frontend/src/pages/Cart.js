import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    const response = await fetch("http://localhost:5000/api/cart/getFromCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setLoading(false);
    setCart(json);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => {
          return (
            <tr>
              <td className="cart">
                <img src={item.image} width="10px" height="10px" alt="Loading Soon..." />
                <p>{item.title}</p>
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.subtotal}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Cart;
