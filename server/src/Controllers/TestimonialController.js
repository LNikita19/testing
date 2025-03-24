const TestimonialModel = require("../Models/TestimonialModel");
const createTestimonial = async (req, res) => {
  try {
    const { id, Name, Photo, Profession, comment } = req.body;

    // Create a new document
    const newData = await TestimonialModel.create({ id, Name, Photo, Profession, comment });

    return res.status(201).send({
      status: true,
      msg: "Data created successfully",
      data: newData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};


const getTestimonialData = async (req, res) => {
  try {
    const TestimonialData = await TestimonialModel.find();
    res.status(200).send({
      status: true,
      msg: "TestimonialData retrieved succesfully",
      data: TestimonialData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getTestimonialDataById = async (req, res) => {
  const TestimonialId = req.params.TestimonialId;
  const TestimonialData = await TestimonialModel.findOne({
    TestimonialId: TestimonialId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: TestimonialData });
};


const updateTestimonialData = async (req, res) => {
  try {
    const { Name, Profession, comment, Photo } = req.body; // Ensure Photo is included
    let TestimonialId = req.params.TestimonialId;



    let updatedData = await TestimonialModel.findByIdAndUpdate(
      TestimonialId,
      {
        $set: {
          Name,
          Photo,
          Profession,
          comment,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send({
        status: false,
        msg: "Testimonial not found",
      });
    }

    return res.status(200).send({
      status: true,
      msg: "Data updated successfully",
      data: updatedData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};


const deleteTestimonialData = async (req, res) => {
  try {
    const result = await TestimonialModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} Testimonialdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};
const deleteTestimonialDataById = async (req, res) => {
  try {
    let TestimonialId = req.params.TestimonialId;


    // Find and update in a single query
    const page = await TestimonialModel.findByIdAndUpdate(
      TestimonialId,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

    if (!page) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    if (page.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

    return res.status(200).send({ status: true, message: "Data deleted successfully." });
  } catch (err) {
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getTestimonialData,
  getTestimonialDataById,
  updateTestimonialData,
  deleteTestimonialData,
  deleteTestimonialDataById
};
