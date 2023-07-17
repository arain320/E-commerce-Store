const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Token = require("../models/tokenModel");
const protect = require("../middleWare/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utilis/sendEmail");

/* // Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}; */

//register the user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      res
        .status(400)
        .json({ status: 400, message: "please fill all the fields" });
      throw new Error("please fill all the fields");
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ status: 400, message: "password must be 6 characters long" });
      throw new Error("password must 6 characters long");
    }
    // Check if user email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ status: 400, message: "Email has been already registered" });
      throw new Error("Email has already been registered");
    }
    const userData = new User({
      name: name,
      email: email,
      password: password,
    });
    const finalUser = await userData.save();
    if (finalUser) {
      res.status(201).json({ status: 201, message: "registration successful" });
    } else {
      res.status(400).json({ status: 400, message: "invalid user data" });
      throw new Error("invalid user data");
    }
    //create email
    const message = `
     <h2>Hello ${finalUser.name}</h2>
     <p>we are happy that you are register yourself at HASNAINSTORE</p>  
     <p>Regards.....</p>
     <p>M Hasnain Saleem Arain @HASNAINSTORE</p>
   `;
    const subject = `welcome ${finalUser.name}`;
    const send_to = finalUser.email;
    const sent_from = process.env.EMAIL_USER;
    //send email to user
    await sendEmail(subject, message, send_to, sent_from);
  } catch (err) {
    res
      .status(401)
      .json({ status: 401, err, message: "register error in happen" });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: 400, message: "please fill all the fields" });
      throw new Error("please add email and password");
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res
        .status(400)
        .json({ status: 400, message: "invalid email or password" });
      throw new Error("invalid email or password");
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      res
        .status(400)
        .json({ status: 400, message: "invalid password or email" });
      throw new Error("invalid password or email");
    }
    if (findUser && checkPassword) {
      // Delete token if it exists in DB
      let token = await Token.findOne({ userId: findUser._id });
      if (token) {
        await token.deleteOne();
      }
      //create reset token with user id
      const resetToken = crypto.randomBytes(32).toString("hex") + findUser._id;
      //hashed reset token before save into database
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      await new Token({
        userId: findUser._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
      }).save();
      // create reset url
      const verifyUrl = `${process.env.FRONTEND_URL}/verifyEmail/${resetToken}`;
      //create email
      const message = `
      <h2>Hello ${findUser.name}</h2>
      <p>Please use the url below to confirm yourself...</p>  
      <p>This reset link is valid only for 30minutes...</p>
      <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
      <p>Regards.....</p>
      <p>M Hasnain Saleem Arain @HASNAINSTORE</p>
    `;
      const subject = "Email Confirm Request";
      const send_to = findUser.email;
      const sent_from = process.env.EMAIL_USER;
      //send email to user
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({
        status: 200,
        success: true,
        message: "verification Email Sent",
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "invalid email or password or both" });
      throw new Error("invalid password or email or both");
    }
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, error, message: "register error in happen" });
  }
});

//verify email link
router.post("/verifyEmail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hashedToken = crypto.createHash("sha256").update(id).digest("hex");
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
    if (!userToken) {
      res
        .status(404)
        .json({ status: 404, message: "invalied or Expired Token user" });
      throw new Error("Invalid or Expired Token user");
    }
    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    // Generate jwt Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    //   send cookie to frontend with jwt token
    /*   res.cookie(String(user._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 86400),
      httpOnly: true,
      sameSite: "lax",
    }); */

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    res
      .status(200)
      .json({ status: 200, user, message: "user verification successful" });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, error, message: "invalied or Expired Token catch" });
    throw new Error("Invalid or Expired Token catch");
  }
});

// get login status
router.get("/status", protect, async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId, "-password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ status: 404, message: "user not found" });
    throw new Error("not authorized catch, please login");
  }
});

//logout user
router.get("/logout", protect, async (req, res) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      message: "successfully logout",
    });
  } catch (error) {
    res.json({ error });
  }
});

//forget password
router.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res
        .status(400)
        .json({ status: 400, message: "please fill all the fields" });
      throw new Error("please fill all the fields");
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(400).json({ status: 400, message: "invalid email" });
      throw new Error("invalid email");
    }
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: findUser._id });
    if (token) {
      await token.deleteOne();
    }
    //create reset token with user id and we get this token when user send reset password request and compere it
    const resetToken = crypto.randomBytes(32).toString("hex") + findUser._id;
    //hashed reset token before save into database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await new Token({
      userId: findUser._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
    }).save();
    // create reset url
    const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;
    //create email
    const message = `
      <h2>Hello ${findUser.name}</h2>
      <p>Please use the url below to reset your password...</p>  
      <p>This reset link is valid onlyfor 30minutes...</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>Regards.....</p>
      <p>M Hasnain Saleem Arain @HASNAINSTORE</p>
    `;
    const subject = "Password Reset Request";
    const send_to = findUser.email;
    const sent_from = process.env.EMAIL_USER;
    //send email to user
    await sendEmail(subject, message, send_to, sent_from);

    res
      .status(200)
      .json({ status: 200, success: true, message: "Reset Email Sent" });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Email not sent, please try again" });
    throw new Error("Email not sent, please try again");
  }
});

//reset password
router.post("/reset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, cpassword } = req.body;
    if (!password || !cpassword) {
      res
        .status(400)
        .json({ status: 400, message: "please fill all the fields" });
      throw new Error("please add password and cpassword");
    }
    if (password.length < 6 || cpassword.length < 6) {
      res.status(400).json({
        status: 400,
        message: "password and confirmPassword must be 6 characters long",
      });
      throw new Error("password and confirmPassword must 6 characters long");
    }
    const hashedToken = crypto.createHash("sha256").update(id).digest("hex");
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
    if (!userToken) {
      res
        .status(404)
        .json({ status: 404, message: "invalied or Expired Token" });
      throw new Error("Invalid or Expired Token");
    }
    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password Reset Successful, Please Login",
    });
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, error, message: "reset error in happen" });
  }
});

//get message of user and save it in database
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ status: 400, message: "please fill all field" });
      throw new Error("please fill all the fields");
    }
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      res.status(400).json({ status: 400, message: "please login first" });
      throw new Error("please login first");
    }
    const checkMessage = await Contact.findOne({ message });
    if (checkMessage) {
      res
        .status(400)
        .json({ status: 400, message: "this message is already sent" });
      throw new Error("message already sent");
    }
    if (checkEmail || !checkMessage) {
      const messageData = new Contact({
        name: name,
        email: email,
        message: message,
      });
      const saveMessage = await messageData.save();
      if (saveMessage) {
        res
          .status(200)
          .json({ status: 200, message: "message sent successfully" });
      }
    } else {
      res.status(400).json({ status: 400, message: "somthing went wrong" });
    }
  } catch (err) {
    res
      .status(401)
      .json({ status: 401, err, message: "register error in happen" });
  }
});

module.exports = router;
