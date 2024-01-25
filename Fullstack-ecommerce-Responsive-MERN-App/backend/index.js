const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userModel = require("./model/user")
const productModel = require("./model/productSchema")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('./config/connection');

const PORT = process.env.PORT || 8080;
const secretKey = 'mynameischetansudamjadhav';

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    // console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

app.post('/login', (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };

      jwt.sign({ user: dataSend }, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          res.status(500).json({ error: 'Failed to generate token' });
        } else {
          // Set the cookie with the JWT token
          res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
          res.json({ token });
          console.log('Login successful');
          res.send({
            message: 'Login successful',
            alert: false,
          });
        }
      });
    } else {
      console.log('Email is not available, please sign up');
      res.send({
        message: 'Email is not available, please sign up',
        alert: false,
      });
    }
  });
});

app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({ message: "Upload successfully" })
})

app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})



app.listen(PORT, () => console.log(`server is running at port : ${PORT}`));
