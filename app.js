const express = require('express');
const connectDB = require('./database');
const authRouter = require('./routes/auth.js')
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product.js');
const cartRouter = require("./routes/cart.js")

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", productRouter )
app.use("/", cartRouter)

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });
