const programModel = require("../Models/programModel");
const programData = async (req, res) => {
    try {
        const { id, selectProgram, programFees, startDate, endDate, Photo, programTraining, selectLanguage, youTubeLink, Description } = req.body;

        // Create a new document
        const newData = await programModel.create({ id, selectProgram, programFees, startDate, endDate, Photo, programTraining, selectLanguage, youTubeLink, Description });

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


const getData = async (req, res) => {
    try {
        const programData = await programModel.find();
        res.status(200).send({
            status: true,
            msg: "programData retrieved succesfully",
            data: programData,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const getById = async (req, res) => {
    const programId = req.params.programId;
    const programData = await programModel.findOne({
        programId: programId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: programData });
};


const updateData = async (req, res) => {
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

const Deletedata = async (req, res) => {
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
const DeleteById = async (req, res) => {
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
    getData,
    getById,
    updateData,
    Deletedata,
    DeleteById,
};
