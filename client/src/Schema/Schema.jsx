import * as Yup from "yup";

export const singUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("please enter your name"),
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string().min(6).max(25).required("please enter your password"),
  cpassword: Yup.string()
    .required("please enter your confirm password ")
    .oneOf([Yup.ref("password"), null], "password must match"),
});

export const singInSchema = Yup.object({
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string().min(6).max(25).required("please enter your password"),
});

export const resetSchema = Yup.object({
  email: Yup.string().email().required("please enter your email"),
});

export const forgetSchema = Yup.object({
  password: Yup.string().min(6).max(25).required("please enter your password"),
  cpassword: Yup.string()
  .required("please enter your confirm password ")
  .oneOf([Yup.ref("password"), null], "password must match"),
});

