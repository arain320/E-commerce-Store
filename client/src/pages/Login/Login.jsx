import React from "react";
import "./Login.scss";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { singInSchema } from "../../Schema/Schema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: singInSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/login",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            toast.success("verification link sent to your email");
          }
          action.resetForm();
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(message);
        }
      },
    });
  return (
    <>
      <Header />
      <div className="login">
        <div className="login-container">
          <div className="card">
            <div className="heading">
              <h4>welcome</h4>
              <p>
                sign in to
                <span>
                  <NavLink to="/"> hasnainstore </NavLink>
                </span>
                or <NavLink to="/register">create an account</NavLink>
              </p>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="email form-item">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    placeholder="your email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? <p>{errors.email}</p> : null}
                </div>
                <div className="password form-item">
                  <label htmlFor="password">password</label>
                  <input
                    type={!show ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p>{errors.password}</p>
                  ) : null}
                  <i
                    className={
                      show ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                    }
                    onClick={toggle}
                  ></i>
                </div>

                <div className="button">
                  <input type="submit" value="login" className="btn" />
                </div>
              </form>
            </div>
            <div className="line">
              <span>or</span>
            </div>
            <div className="forget-pass">
              <p
                onClick={() => {
                  navigate("/forget");
                }}
              >
                forget password
              </p>
            </div>
          </div>
        </div>
      </div>
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

export default Login;
