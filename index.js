const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const user = require("./routers/UserRouter");
const product = require("./routers/ProductRouter");
const blog = require("./routers/BlogRouter");
const stripeRoutes = require('./routers/StripeRoutes');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Use the CORS middleware
// Configure CORS to allow requests from 'https://js.stripe.com'
const corsOptions = {
  origin: ['https://js.stripe.com', 'http://localhost:3001' , 'http://localhost:3000'],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
app.use(cors(corsOptions));


mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("DB seccess connecttion!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", user);
app.use("/product", product);
app.use("/blog", blog);
app.use('/stripe', stripeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
