// Imports.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Declare port.
const PORT = 3000;

// Create server.
const app = express();

// Set logger.
app.use(logger("dev"));

// Set middleware.
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set public files to be served.
app.use(express.static("public"));

// Set up mongoose connection.
mongoose.connect("mongodb://localhost/budget",
{
    // Fix mongoose deprecated issues.
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Routes
app.use(require("./routes/api.js"));

// Start the server.
app.listen(PORT, () =>
{
    console.log(`App running on port ${PORT}!`);
});