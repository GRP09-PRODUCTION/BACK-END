import mongoose, { Schema } from "mongoose";

const carsSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nb_races: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    damaged: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", carsSchema);
