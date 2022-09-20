// Initiate express
const express = require("express");
const app = express();
// Initiate path for node file navigation
const path = require("path");
// Initiate dotenv
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
// Initiate mongoose for DB
const mongoose = require("mongoose");
// Initiate basic routes
const appRoutes = require("./routes/app.routes");
// Initiate Port
const port = process.env.PORT || 8080;
// Initiate MONGO URI
const dbUrl = process.env.MONGO_URI;

// Connect to DB
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection open");
  })
  .catch((err) => {
    console.error(err);
  });

// Use express middlewares for form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use todos RESTful route
app.use("/api/todos", appRoutes);

// FOR REACT/NODE-Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.....");
  });
}

// START SERVER
app.listen(port, () => {
  console.log(`Serving at port: ${port}`);
});
