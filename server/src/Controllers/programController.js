const programModel = require("../Models/programModel");
const programData = async (req, res) => {
    try {
        const { selectProgram, programFees, startDate, endDate, programTraining, selectLanguage, youTubeLink, Description } = req.body;
        const Photo = req.file ? req.file.path : null;  // Handle file upload

        const newData = await programModel.create({
            selectProgram,
            programFees,
            startDate,
            endDate,
            programTraining,
            selectLanguage,
            youTubeLink,
            Description,
            Photo, // Save image path
        });

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



const getprogramData = async (req, res) => {
    try {
        const programData = await programModel.find({ isDeleted: false });
        res.status(200).send({
            status: true,
            msg: "programData retrieved successfully",
            data: programData,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: "server error", error: err.message });
    }
};


const getBprogramyId = async (req, res) => {
    const programId = req.params.programId;
    const programData = await programModel.findOne({
        programId: programId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: programData });
};


const updateprogramData = async (req, res) => {
    try {
        const { id, youTubeLink, Description, selectProgram, endDate, programFees, startDate, Photo, programTraining, selectLanguage } = req.body;

        let programId = req.params.programId;
        let updateBody = await programModel.findOneAndUpdate(
            { _id: programId },
            {
                $set: {
                    selectProgram: selectProgram,
                    endDate: endDate,
                    selectLanguage: selectLanguage,
                    programFees: programFees,
                    Photo: Photo,
                    youTubeLink: youTubeLink,
                    Description: Description,
                    startDate: startDate,
                    programTraining: programTraining,
                    programId: programId
                },
            },
            { new: true }
        );

        return res.status(200).send({
            status: true,
            msg: "Data updated successfully",
            data: updateBody,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const Deleteprogramdata = async (req, res) => {
    try {
        const result = await programModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} programdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteprogramById = async (req, res) => {
    try {
        let programId = req.params.programId;


        // Find and update in a single query
        const page = await programModel.findByIdAndUpdate(
            programId,
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
    programData,
    getprogramData,
    getBprogramyId,
    updateprogramData,
    Deleteprogramdata,
    DeleteprogramById,
};
