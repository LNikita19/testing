const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // using memory storage for simplicity
const upload = multer({ storage: storage });
const {
  homeData,
  getData,
  getById,
  updateData,
  Deletedata,
  DeleteById,
} = require("../Controllers/homeController");

const {
  aboutData,
  getaboutData,
  getBaboutyId,
  updateaboutData,
  Deleteaboutdata,
  DeleteaboutById,
} = require("../Controllers/aboutController");


const {
  programData,
  getprogramData,
  getBprogramyId,
  updateprogramData,
  Deleteprogramdata,
  DeleteprogramById,
} = require("../Controllers/programController");


const {
  authorData,
  getauthorData,
  getauthorById,
  updateAuthorData,
  DeleteAuthordata,
  DeleteAuthorById,
} = require('../Controllers/AuthorController');

const { createTestimonial,
  getTestimonialData,
  getTestimonialDataById,
  updateTestimonialData,
  deleteTestimonialData,
  deleteTestimonialDataById } = require("../Controllers/TestimonialController");
const { footerData,
  getfooterData,
  getfooterById,
  updatefooterData,
  Deletefooterdata,
  DeleteBfooteryId, } = require("../Controllers/footerController");
//user
const {
  createUser,
  userLogin,
  getusersData,
} = require("../Controllers/loginController");


const TestimonialController = require("../Controllers/TestimonialController");
// const multer = require("multer");

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save files in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

/// const { createTestimonial,
//   getTestimonialData,
//   getTestimonialDataById,
//   updateTestimonialData,
//   deleteTestimonialData,
//   deleteTestimonialDataById} = require("../Controllers/TestimonialController")
// Testimonial routes
router.post("/createtestimonial", upload.single("Photo"), TestimonialController.createTestimonial);
router.put("/updatetestimonialdata/:TestimonialId", upload.single("Photo"), TestimonialController.updateTestimonialData);
router.get("/gettestimonialdata", TestimonialController.getTestimonialData);
router.get("/gettestimonialdatabyid/:TestimonialId", TestimonialController.getTestimonialDataById);
// router.delete("/deletetestimonialdata", TestimonialController.deleteTestimonialData);
router.delete("/deletetestimonialdatabyid/:TestimonialId", TestimonialController.deleteTestimonialDataById);
//Home//
router.post("/createData", upload.single("Photo"), homeData);
router.get("/getData", getData);
router.get("/getById/:homeId", getById);
router.put("/updateData/:homeId", upload.single("Photo"), updateData);
router.delete("/deleteData", Deletedata);
router.delete("/deleteId/:homeId", DeleteById);
//about
router.post("/createaboutData", upload.single("Photo"), aboutData);
router.get("/getaboutData", getaboutData);
router.get("/getaboutById/:aboutId", getBaboutyId);
router.put(
  "/updateaboutData/:id",
  upload.fields([
    { name: "Photo1", maxCount: 1 },
    { name: "Photo2", maxCount: 1 }
  ]),
  updateaboutData
);



// router.put("/updateaboutData/:aboutId", upload.single("Photo"), updateaboutData);
router.delete("/deleteaboutData", Deleteaboutdata);
router.delete("/deleteaboutId/:aboutId", DeleteaboutById);


//author
router.post("/authorData", upload.single("Photo"), authorData);
router.get("/getauthorData", getauthorData);
router.get("/getauthorById/:authorId", getauthorById);
router.put("/updateauthorData/:authorId", upload.single("Photo"), updateAuthorData);
router.delete("/deleteauthorData", DeleteAuthordata);
router.delete("/deleteauthorId/:authorId", DeleteAuthorById);


//program 

router.post("/programData", upload.single("Photo"), programData);
router.get("/getprogramData", getprogramData);
router.get("/getprogramById/:programId", getBprogramyId);
router.put("/updateprogramData/:programId", upload.single("Photo"), updateprogramData);
router.delete("/Deleteprogramdata", Deleteprogramdata);
router.delete("/DeleteprogramById/:programId", DeleteprogramById);


//footer
router.post("/footerData", upload.single("Photo"), footerData);
router.get("/getfooterData", getfooterData);
router.get("/getfooterById/:footerId", getfooterById);
router.put("/updatefooterData/:footerId", upload.single("Photo"), updatefooterData);
router.delete("/Deletefooterdata", Deletefooterdata);
router.delete("/DeleteBfooteryId/:footerId", DeleteBfooteryId);

//user Login
router.post("/createUser", createUser);
router.post("/userLogin", userLogin);
router.get("/getusersData", getusersData);
module.exports = router;
