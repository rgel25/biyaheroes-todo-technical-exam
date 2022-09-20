const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
// require("dotenv").config();
const mongoose = require("mongoose");
const appRoutes = require("./routes/app.routes");

const port = process.env.PORT || 8080;

const dbUrl = process.env.MONGO_URI;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", appRoutes);

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

app.listen(port, () => {
  console.log(`Serving at port: ${port}`);
});
