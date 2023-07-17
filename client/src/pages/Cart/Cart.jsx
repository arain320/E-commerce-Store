import React from "react";
import "./Cart.scss";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../store/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return new Intl.NumberFormat("en-IN", {}).format(total);
  };
  const totalQuantity = () => {
    let totalqty = 0;
    products.forEach((item) => {
      totalqty += item.quantity;
    });
    return totalqty;
  };
  return (
    <>
      <Header />
      {isLoggedIn ? (
        <>
          <div className="section-cart">
            <div className="container-cart">
              <div className="left">
                <div className="top">
                  <span>your cart</span>
                </div>
                {products?.map((item) => (
                  <>
                    <div className="bottom">
                      <div className="box">
                        <div className="image">
                          <img src={item.path} alt="product" />
                        </div>
                        <div className="name">
                          <span>{item.name}</span>
                        </div>
                        <div className="price">
                          <p>
                            Rs:{" "}
                            <span>
                              {new Intl.NumberFormat("en-IN", {}).format(
                                item.price
                              )}{" "}
                            </span>
                          </p>
                          <p className="last">
                            Rs:{" "}
                            <span>
                              {new Intl.NumberFormat("en-IN", {}).format(
                                item.lastprice
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="qty">
                          <p>qty</p>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="icon">
                          <div className="total-price">
                            <p>total</p>
                            <span>
                              {new Intl.NumberFormat("en-IN", {}).format(
                                item.price * item.quantity
                              )}{" "}
                            </span>
                          </div>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => {
                              dispatch(removeItem(item.id));
                              toast.success(`${item.name} remove from cart`);
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {products.length > 0 ? (
                  <div className="remove-all">
                    <button
                      className="btn-delete"
                      onClick={() => {
                        dispatch(resetCart());
                        toast.success("All products removed from your cart");
                      }}
                    >
                      Delete all
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="right">
                <div className="heading">
                  <span>Order summary</span>
                </div>
                <div className="total">
                  <div className="name">
                    <p>totalpayment</p>
                  </div>
                  <div className="price">
                    <p>
                      Rs: <span>{totalPrice()} </span>
                    </p>
                  </div>
                </div>
                <div className="button">
                  <button className="btn">
                    proceed to checkout <span>({totalQuantity()})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <div className="empty-card">
            <p>Please login first</p>
            <button
              className="btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default Cart;
