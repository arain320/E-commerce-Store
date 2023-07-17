import React from "react";
import "./Register.scss";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { singUpSchema } from "../../Schema/Schema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [cpass, setCpass] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const confirmToggle = () => {
    setCpass(!cpass);
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: singUpSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        try {
          const res = await axios.post(
            "http://localhost:5000/api/register",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.statusText === "Created") {
            toast.success("successfully login");
            navigate("/login");
          }
          console.log(res);
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
      <div className="register">
        <div className="register-container">
          <div className="card">
            <div className="heading">
              <h4>welcome</h4>
              <p>
                register to
                <span>
                  <NavLink to="/"> hasnainstore </NavLink>
                </span>
                or <NavLink to="/login">Already have an account</NavLink>
              </p>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="name form-item">
                  <label htmlFor="name">Fullname</label>
                  <input
                    type="text"
                    placeholder="First and Last name"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? <p>{errors.name}</p> : null}
                </div>
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
                    placeholder="At least 6 characters"
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
                <div className="password form-item">
                  <label htmlFor="cpassword">Confirm password</label>
                  <input
                    type={!cpass ? "password" : "text"}
                    placeholder="confirm your password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cpassword && touched.cpassword ? (
                    <p>{errors.cpassword}</p>
                  ) : null}
                  <i
                    className={
                      cpass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                    }
                    onClick={confirmToggle}
                  ></i>
                </div>
                <div className="button">
                  <input type="submit" value="register" className="btn" />
                </div>
              </form>
            </div>
            <div className="line">
              <span>or</span>
            </div>
            <div className="google-login">
              <button
                className="google-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </button>
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

export default Register;
