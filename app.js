require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send('<h1>Store</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);
//products route
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.log("ERROR - : " + err);
  }
};

start();
