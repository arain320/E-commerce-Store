import React, { useState, useEffect } from "react";
import "./Products.scss";
import axios from "axios";
import GoTop from "../../components/goToTop/GoTop";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Products = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const searchValue = useSelector((state) => state.search.searchValue);

  useEffect(() => {
    if (searchValue) {
      setQuery(searchValue.search);
    }
  }, [searchValue]);
  const toggle = () => {
    setIsShown(!isShown);
  };

  //get product from backend
  const getProduct = async () => {
    const res = await axios.get(`http://localhost:5000/api/items`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log("something went wrong");
    } else {
      setResult(res.data.getItems);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header />
      <GoTop />
      <div className="container-lg">
        <div className="product-category">
          <div className="button">
            <button onClick={toggle}>
              category
              <i
                className={
                  isShown
                    ? "fa-solid fa-chevron-down"
                    : "fa-solid fa-chevron-right"
                }
              ></i>
            </button>
          </div>
          <div className={isShown ? "links active" : "links"} onClick={toggle}>
            <div className="common left">
              <li
                onClick={() => {
                  setQuery("men");
                }}
              >
                men
              </li>
              <li
                onClick={() => {
                  setQuery("women");
                }}
              >
                women
              </li>
              <li
                onClick={() => {
                  setQuery("shoes");
                }}
              >
                shoes
              </li>
              <li
                onClick={() => {
                  setQuery("kids");
                }}
              >
                kids
              </li>
              <li
                onClick={() => {
                  setQuery("mobile");
                }}
              >
                mobile
              </li>
              <li
                onClick={() => {
                  setQuery("canon");
                }}
              >
                canon
              </li>
              <li
                onClick={() => {
                  setQuery("realme");
                }}
              >
                realme
              </li>
              <li
                onClick={() => {
                  setQuery("cream");
                }}
              >
                cream
              </li>
              <li
                onClick={() => {
                  setQuery("facewash");
                }}
              >
                facewash
              </li>
              <li
                onClick={() => {
                  setQuery("hair");
                }}
              >
                hair
              </li>
            </div>
            <div className="common middle">
              <li
                onClick={() => {
                  setQuery("laptop");
                }}
              >
                laptop
              </li>
              <li
                onClick={() => {
                  setQuery("camera");
                }}
              >
                camera
              </li>
              <li
                onClick={() => {
                  setQuery("watch");
                }}
              >
                watch
              </li>
              <li
                onClick={() => {
                  setQuery("adidas");
                }}
              >
                adidas
              </li>
              <li
                onClick={() => {
                  setQuery("nikon");
                }}
              >
                nikon
              </li>
              <li
                onClick={() => {
                  setQuery("xiaomi");
                }}
              >
                xiaomi
              </li>
              <li
                onClick={() => {
                  setQuery("soap");
                }}
              >
                soap
              </li>
              <li
                onClick={() => {
                  setQuery("dettol");
                }}
              >
                dettol
              </li>
              <li
                onClick={() => {
                  setQuery("tv");
                }}
              >
                smart TV
              </li>
              <li
                onClick={() => {
                  setQuery("hp");
                }}
              >
                hp
              </li>
            </div>
            <div className="common right">
              <li
                onClick={() => {
                  setQuery("apple");
                }}
              >
                apple
              </li>
              <li
                onClick={() => {
                  setQuery("samsung");
                }}
              >
                samsung
              </li>
              <li
                onClick={() => {
                  setQuery("huawei");
                }}
              >
                huawei
              </li>
              <li
                onClick={() => {
                  setQuery("nike");
                }}
              >
                nike
              </li>
              <li
                onClick={() => {
                  setQuery("puma");
                }}
              >
                puma
              </li>
              <li
                onClick={() => {
                  setQuery("vivo");
                }}
              >
                vivo
              </li>
              <li
                onClick={() => {
                  setQuery("oppo");
                }}
              >
                oppo
              </li>
              <li
                onClick={() => {
                  setQuery("ponds");
                }}
              >
                ponds
              </li>
              <li
                onClick={() => {
                  setQuery("garnier");
                }}
              >
                garnier
              </li>
              <li
                onClick={() => {
                  setQuery("dell");
                }}
              >
                dell
              </li>
            </div>
          </div>
        </div>
        <div className="product">
          <div className="product-heading">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery("");
              }}
            >
              All Products
            </span>
          </div>
          <div className="product-container">
            {result.length > 0
              ? result
                  .filter(
                    (data) =>
                      data.category.includes(query) ||
                      data.company.includes(query) ||
                      data.tag.includes(query) ||
                      data.name.includes(query) ||
                      data.price.includes(query)
                  )
                  .map((product, index) => {
                    return (
                      <>
                        <div
                          className="product-card"
                          onClick={() => {
                            navigate(`/detail/${product._id}`);
                          }}
                        >
                          <div className="image">
                            <img src={product.path} alt="" />
                          </div>
                          <div className="name">
                            <span>{product.name}</span>
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
                              <i class="fa-solid fa-star"></i>{" "}
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
      </div>
      <Footer />
    </>
  );
};

export default Products;
