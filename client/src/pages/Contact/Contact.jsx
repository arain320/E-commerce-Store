import React from "react";
import "./Contact.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        toast.success("message successfully sent");
      }
      setData({
        ...data,
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  const mystyle = {
    width: "100%",
    height: "100%",
    loading: "lazy",
  };
  return (
    <>
      <Header />
      <div className="contact">
        <div className="heading">
          <span>Contact us</span>
        </div>
        <div className="contact-container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
            <div className="heading-form">
            <span>send message</span>
           </div>
              <div className="name item">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">name</label>
              </div>
              <div className="email item">
                <input
                  type="email"
                  required
                  autoComplete="off"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="text-area">
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="5"
                  autoComplete="off"
                  value={data.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">message</label>
              </div>
              <div className="button">
                <input type="submit" value="send" className="btn" />
              </div>
            </form>
          </div>
          <div className="info">
            <div className="location">
              <iframe title="hasnainsaleemarain"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54852.24067851802!2d72.39502635358669!3d30.76713984770429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39233de24bcbb2ef%3A0xfc8ccf6d0d3ffccf!2sPir%20Mahal%2C%20Toba%20Tek%20Singh%20District%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1673027989230!5m2!1sen!2s"
                style={mystyle}
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="address">
          <div className="row">
            <div className="icon">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div className="text">
              <span>Pir mahal,T.T.Singh,Pakistan</span>
            </div>
          </div>
          <div className="row">
            <div className="icon">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div className="text">
              <span>husnain320@gmail.com</span>
            </div>
          </div>
          <div className="row">
            <div className="icon">
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className="text">
              <span>+923008090100</span>
            </div>
          </div>
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

export default Contact;
