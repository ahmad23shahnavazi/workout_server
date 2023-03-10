const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");
const router = express.Router();

//authentication need for all rout
router.use(requireAuth);

//get all workouts
router.get("/", getWorkouts);

//get single workout
router.get("/:id", getWorkout);

//post a new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//update a router
router.patch("/:id", updateWorkout);
module.exports = router;
