const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const productRoute = require("./routes/product-Route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/product", productRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server running on port" + PORT);
});
