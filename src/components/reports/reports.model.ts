import mongoose, { Schema } from "mongoose";

const reportsSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    max_speed: {
      type: Number,
      required: true,
    },
    min_speed: {
      type: Number,
      required: true,
    },
    distance_traveled: {
      type: Number,
      required: true,
    },
    winner: {
      type: Boolean,
      required: true,
    },
    car_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    accident: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reports", reportsSchema);
