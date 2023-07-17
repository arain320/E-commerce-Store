import React, { useState, useEffect } from "react";
import "./Detail.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartReducer";
import GoTop from "../../components/goToTop/GoTop";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState("");
  const [cate, setCate] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  //get single product detail
  useEffect(() => {
    const productDetail = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/loadProduct/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(res.data.singleItem[0]);
      setCate(res.data.singleItem[0].category);
    };
    productDetail();
  }, [id]);
  //get product of same category from backend
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/category`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === 401 || !res.data) {
        console.log("something went wrong");
      } else {
        setResult(res.data.products);
      }
    };
    getProduct();
  }, [id]);

  const addCart = () => {
    dispatch(
      addToCart({
        id: data._id,
        name: data.name,
        path: data.path,
        price: data.price,
        lastprice: data.lastprice,
        quantity: quantity,
      })
    );
    toast.success("product add to cart");
  };
  return (
    <>
      <Header />
      <GoTop />
      <div className="detail">
        <div className="detail-container">
          <div className="left">
            <div className="image">
              <img src={data.path} alt="product" />
            </div>
          </div>
          <div className="right">
            <div className="name">
              <span>{data.name}</span>
            </div>
            <div className="price">
              <p>
                Last price&nbsp;:&nbsp;&nbsp;
                <span>
                  Rs:
                  {new Intl.NumberFormat("en-IN", {}).format(data.lastprice)}
                </span>
              </p>
              <p>
                Price&nbsp;&nbsp;:
                <span>
                  &nbsp;&nbsp; Rs: &nbsp;
                  {new Intl.NumberFormat("en-IN", {}).format(data.price)}
                </span>
              </p>
              <p>
                Discount&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                <span>
                  {Math.ceil(
                    (100 * (data.lastprice - data.price)) / data.lastprice
                  )}
                  %
                </span>
              </p>
              <p>
                You save&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                <span>
                  {new Intl.NumberFormat("en-IN", {}).format(
                    data.lastprice - data.price
                  )}
                </span>
              </p>
            </div>
            <div className="brand-cate">
              <p>
                Product Brand&nbsp;&nbsp;:&nbsp;&nbsp;
                <span>{data.company} </span>
              </p>
              <p>
                Product type&nbsp;&nbsp;:&nbsp;&nbsp;
                <span>{data.category} </span>
              </p>
            </div>
            <div className="quantity">
              <p>
                Quantity&nbsp;&nbsp;:
                <span>
                  <button>
                    <i
                      className="fa-solid fa-minus"
                      onClick={() =>
                        setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                      }
                    ></i>
                  </button>
                  <span>{quantity}</span>
                  <button>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    ></i>
                  </button>
                </span>
              </p>
            </div>
            <div className="button">
              <button className="btn-cart" onClick={addCart}>
                <i className="fa-solid fa-cart-shopping"></i>Add to cart
              </button>
            </div>
            <div className="description">
              <span>Product description</span>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
        <div className="product">
          <div className="product-heading">
            <span>Product related to this category</span>
          </div>
          {
            <div className="product-container">
              {result.length > 0
                ? result
                    .filter((data) => data.category.includes(cate))
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
          }
        </div>
      </div>
      <Footer />
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

export default Detail;
