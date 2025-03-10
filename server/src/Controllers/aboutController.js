const aboutModel = require("../Models/aboutModal");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const aboutData = async (req, res) => {
  try {
    const { id, Heading, Description, Photo, Photo1 } = req.body;

    // Create a new document
    const newData = await aboutModel.create({ id, Heading, Description, Photo, Photo1 });

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


const getaboutData = async (req, res) => {
  try {
    const aboutData = await aboutModel.find();
    res.status(200).send({
      status: true,
      msg: "aboutData retrieved succesfully",
      data: aboutData,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "server error", error: err.message });
  }
};

const getBaboutyId = async (req, res) => {
  const aboutId = req.params.aboutId;
  const aboutData = await aboutModel.findOne({
    aboutId: aboutId,
    isDeleted: false,
  });
  return res
    .status(200)
    .send({ status: true, msg: "Data fetch succesfully", data: aboutData });
};


const updateaboutData = async (req, res) => {
  try {
    const { Heading, Description } = req.body;
    let updateBody = { Heading, Description };

    if (req.files?.Photo) {
      updateBody.Photo = req.files.Photo[0].buffer.toString("base64");
    }
    if (req.files?.Photo1) {
      updateBody.Photo1 = req.files.Photo1[0].buffer.toString("base64");
    }

    const aboutId = req.params.aboutId;
    const updatedData = await aboutModel.findByIdAndUpdate(aboutId, updateBody, { new: true });

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

const Deleteaboutdata = async (req, res) => {
  try {
    const result = await aboutModel.deleteMany({});
    res.send(`Deleted ${result.deletedCount} aboutdata`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: false, msg: "server error", error: error.message });
  }
};
const DeleteaboutById = async (req, res) => {
  try {
    let aboutId = req.params.aboutId;

    // Find the document first
    const existingPage = await aboutModel.findById(aboutId);

    if (!existingPage) {
      return res.status(404).send({ status: false, message: "Page not found" });
    }

    if (existingPage.isDeleted) {
      return res.status(400).send({ status: false, message: "Data has already been deleted." });
    }

    // Now update
    await aboutModel.findByIdAndUpdate(
      aboutId,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );

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
  aboutData,
  getaboutData,
  getBaboutyId,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
};
