const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connecting to db & listening to port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
