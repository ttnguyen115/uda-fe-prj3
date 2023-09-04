const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require('cors');
const express = require("express");
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("website"));

// init middlewares ----------------------------------------------------------------------------------------------------
// DEV env
app.use(morgan("dev"));
// Protect metadata header information including tech stacks, ...
app.use(helmet());
// Optimize the response capacity
app.use(compression());
// Add CORS
app.use(cors());

// Init routes
app.use("/api", require("./routes"));

// Setup Server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Uda Project 2 starts with port: ${PORT}`);
});

// SIGINT => on type Ctrl + C in IDE
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express"));
});
