const Lecture = require("../models/LectureModel");

// GRAPHQL API
exports.getAllLectures = async (req, res) => {
  const lectures = await Lecture.find({}).populate("createdBy");
  return lectures;
};

exports.getSingleLecture = async (id) => {
  const singleLecture = await Lecture.findById(id);
  return singleLecture;
};

exports.getLectureByUser = async (id) => {
  const lecture = await Lecture.find({
    createdBy: id,
  });
  return lecture;
};

// *****************************************************************************************
// REST API
exports.createLecture = async (req, res) => {
  try {
    const {
      title,
      description,
      position,
      videoUrl,
      duration,
      isPublished,
      isPreview,
      instructor,
    } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated or user ID not found",
      });
    }
    console.log("User Creating Product: ", req.user._id);

    const newLecture = new Lecture({
      createdBy: req.user,
      title,
      description,
      position,
      videoUrl,
      duration,
      instructor,
      isPublished,
      isPreview,
    });

    await newLecture.save();

    return res.status(201).json({
      success: true,
      message: "Lecture Created Successfully",
      newLecture,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};
