import React from "react";
import "./Reset.scss";
import { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { forgetSchema } from "../../Schema/Schema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  password: "",
  cpassword: "",
};

const Reset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
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
      validationSchema: forgetSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post(
            `http://localhost:5000/api/reset/${id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200 ) {
            toast.success("password changed please login");
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
      <div className="container">
        <div className="form">
          <div className="heading">
            <span>reset password</span>
            <p>
              <NavLink to="/login">login</NavLink>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
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
              <input type="submit" value="send" className="btn" />
            </div>
          </form>
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

export default Reset;
