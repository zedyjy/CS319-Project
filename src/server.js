const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");

const server = express();
server.use(cors());
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

const apirouter = require("./routes/apirouter");
const publicrouter = require("./publicrouter");

server.use(apirouter);
server.use(publicrouter);

// Set the limit for incoming JSON and urlencoded data to 50mb

server.set("json limit", "50mb");
server.set("urlencoded limit", "50mb");

console.log(
  `Current limit: ${server.get("json limit")} (JSON) / ${server.get(
    "urlencoded limit"
  )}`
);

// Use ejs middleware to handle HTML rendering page requests
server.engine("html", require("ejs").renderFile); // Use EJS engine for HTML files
server.set("views", path.join(__dirname, "view")); // Set the views directory
server.set("view engine", "html"); // Set the view engine to HTML

// Start server (port, ip) Port 80 is default for main ip.
server.listen(80, "127.0.0.1", () => {
  console.log(`Server started at http://localhost`);
});
