const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        Photo: {
            type: String,
        },
        selectProgram: {
            type: String,
        },
        programFees: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        programTraining: {
            type: String,
        },
        selectLanguage: {
            type: String,
        },
        youTubeLink: {
            type: String,
        },
        Description: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Program", programSchema);
