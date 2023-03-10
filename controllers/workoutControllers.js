const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get  all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createAt: -1 });
  res.status(200).json({ workouts });
};
//get a workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the id is not valid" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};
//create a workout
const createWorkout = async (req, res) => {
  const { title, loads, reps } = req.body;
  const user_id = req.user._id;
  let empetyArray = [];

  if (!title) {
    empetyArray.push("title");
  }
  if (!loads) {
    empetyArray.push("loads");
  }
  if (!reps) {
    empetyArray.push("reps");
  }
  if (empetyArray.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill all the filds", empetyArray });
  }
  try {
    const workout = await Workout.create({ title, loads, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the id is not valid" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the id is not valid" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
