import React from "react";
import "./Forget.scss";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { resetSchema } from "../../Schema/Schema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
};

const Forget = () => {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: resetSchema,
      onSubmit: async (values, action) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/forget",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            toast.success("please check your email");
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
      <div className="forget-container">
        <div className="form">
         <div className="card">
         <div className="heading">
            <span>forget password</span>
            <p>
              <NavLink to="/login">login</NavLink>
            </p>
          </div>
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
            <div className="button">
              <input type="submit" value="send" className="btn" />
            </div>
          </form>
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

export default Forget;
