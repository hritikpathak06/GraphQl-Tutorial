const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    isPreview: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
