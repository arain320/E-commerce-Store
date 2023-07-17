import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Deal = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  //get product of special tag from backend
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("http://localhost:5000/api/deal", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        setResult(res.data.getItems);
      }
    };
    getProduct();
  }, []);
  return (
    <>
      <div className="product">
        <div className="product-heading">
          <span>Special for today</span>
          <p>
            <NavLink to="/products">
              Shop more <i class="fa-sharp fa-solid fa-right-long"></i>
            </NavLink>
          </p>
        </div>
        <div className="product-container">
          {result.length > 0
            ? result.map((product, index) => {
                return (
                  <>
                    <div
                      className="product-card"
                      onClick={() => {
                        navigate(`/detail/${product._id}`);
                      }}
                    >
                      <div className="image">
                        <img src={product.path} alt="product" />
                      </div>
                      <div className="name">
                        <span>{product.name} </span>
                      </div>
                      <div className="price">
                        <span>
                          Rs:
                          {new Intl.NumberFormat("en-IN", {}).format(
                            product.price
                          )}
                        </span>
                        <span>
                          {new Intl.NumberFormat("en-IN", {}).format(
                            product.lastprice
                          )}
                        </span>
                      </div>
                      <div className="star-sold">
                        <div className="star">
                          <i class="fa-solid fa-star"></i>
                          <span>{product.star}/5</span>
                        </div>
                        <div className="sold">
                          <span>( {product.sold} )</span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Deal;
