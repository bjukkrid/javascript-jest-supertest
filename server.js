require("dotenv").config();
var express = require("express");
const bodyParser = require("body-parser");

const bookRouter = require("./routes/book.routes");

var app = express();
// app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/books", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists",
  });
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message",
  });
});

app.listen(process.env.PORT, function () {
  console.log("App listening on port 3000!");
});

module.exports = app;
