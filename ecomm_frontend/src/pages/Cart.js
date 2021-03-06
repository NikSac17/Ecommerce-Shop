import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../components/Loading";
import EmptyCart from "./EmptyCart";

const END_POINT="http://localhost:5000";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const getCartItems = async () => {
    const response = await fetch(`${END_POINT}/api/cart/getFromCart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setLoading(false);
    setCart(json);
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
    } else {
      history.push("/login");
    }
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `${END_POINT}/api/cart/deleteFromCart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = response.json();
    const newData=cart.filter((element)=>{
        return element._id!==id;
    });
    setCart(newData);
  };

  return (
    <>
      {loading && <Loading />}
      {cart.length === 0 && <EmptyCart/>}
      {!loading && cart.length !== 0 && (
        <table className="table">
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
                    <img
                      src={item.image}
                      width="10px"
                      height="10px"
                      alt="Loading Soon..."
                    />
                    <p>{item.title}</p>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subtotal}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={()=>handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Cart;
