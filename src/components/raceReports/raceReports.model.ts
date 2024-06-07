import mongoose, { Schema } from "mongoose";

const raceReportsSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    race_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    report_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RaceReports", raceReportsSchema);
