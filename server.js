const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// Routes


// html routes
app.get("/exercise", (req, res) => {
   res.sendFile("exercise.html");
});

// API routes
app.post("/api/workouts/:id", (req, res) => {
    db.Workout.update({ _id: mongojs.ObjectId(req.params.id)},
    {$set: {
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        modified: Date.now()
    }})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    db.Workout.insert(req.body, (error, data) => {
      if (error) {
        console.log(error) 
      } else {
        res.json(data)
      }
    })
  })

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
