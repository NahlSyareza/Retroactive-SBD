const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/UserRoute");
const tokoRoute = require("./routes/TokoRoute");
const logger = require("./tools/Logger");
const middlewareLogger = require("./middlwares/MiddlewareLogging");
const port = 1466;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareLogger);

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use("/user", userRoute);
app.use("/shop", tokoRoute);

app.listen(port, () => {
  logger.info("Server starting on port ", port);
});
