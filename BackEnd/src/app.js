require("module-alias/register");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const httpStatus = require("http-status");
const routes = require("./routes/v1");

const { errorConverter, errorHandler } = require("./middlewares/error");

const ApiError = require("./utils/ApiError");
const handleListenEventSmartContract = require("./hanleEventContract/index");

const app = express();

//static files
app.use("/static", express.static(path.join(__dirname, "public")));

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// parse cookie
app.use(cookieParser("quy"));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options("*", cors());

// render html

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// listen all event from smart contract
handleListenEventSmartContract();
module.exports = app;
