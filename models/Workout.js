const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: { type: Date, default: () => {
    new Date()
  } }, 
  exercises: [
    {
    type: { type: String, trim: true },
    name: { type: String, trim: true },
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
  }
]
},
{
  toJSON: {
    virtuals: true,
  }
}
);

WorkoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((iterator, exercise) => {
    return iterator + exercise.duration
  }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;