import React, { useState } from "react";
import "./Header.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authReducer";
import { resetCart } from "../../store/cartReducer";
import { getValue } from "../../store/searchReducer";
axios.defaults.withCredentials = true;

const Header = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const products = useSelector((state) => state.cart.products);
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  /*  useEffect(() => {
    const auth = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/status",

        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) {
        dispatch(login());
      }
    };

    auth();
  }, []); */
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(logout());
      dispatch(resetCart());
      navigate("/");
    }
  };
  const setSearch = (e) => {
    e.preventDefault();
    dispatch(
      getValue({
        search: value,
      })
    );
    navigate("/products");
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
      <div className="navbar">
        <div className="main-logo">
          <h3>
            <NavLink to="/" data-text="hasnainstore...">
              hasnainstore...
            </NavLink>
          </h3>
        </div>

        <div className={show ? "search active" : "search"}>
          <form>
            <input
              type="text"
              placeholder="search product here..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
              autoComplete="off"
            />
            <button type="submit" onClick={setSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className={show ? "links active" : "links"}>
          <ul>
            <li>
              <NavLink to="/products">products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">contact</NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink onClick={handleLogout}>logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">sign in</NavLink>
              </li>
            )}
            <li className="cart">
              <NavLink to="/cart">
                <i className="fa-solid fa-cart-plus"></i>
                <span>{totalQuantity()} </span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">
          <span onClick={toggle}>
            {show ? (
              <ion-icon name="close-outline"></ion-icon>
            ) : (
              <ion-icon name="menu-outline"></ion-icon>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
