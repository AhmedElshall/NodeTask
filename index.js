require("./requires/mongooseConfig");
const express = require("express");
const userRouter = require("./routes/user");
const statusRouter = require("./routes/status");
const path = require("path");
const app = express();
const PORT = 4000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res, next) => {
  res.render("Task1");
});
app.get("/task2", (req, res, next) => {
  res.render("Task2");
});
app.get("/task3", (req, res, next) => {
  res.render("Task3");
});
app.use("/users", userRouter);
app.use("/status", statusRouter);
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
