import mongoose, { Schema } from "mongoose";

const racesSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    start_at: {
      type: Date,
      required: true,
    },
    end_at: {
      type: Date,
      required: true,
    },
    circuit_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    nb_drivers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Races", racesSchema);
