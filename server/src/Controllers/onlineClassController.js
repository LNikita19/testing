const onlineclassModel = require("../Models/onlineclassModel");
const onlineclassData = async (req, res) => {
    try {
        const { id, selectProgram, programFees, startDate, endDate, Photo, programTraining, selectLanguage, youTubeLink, Description } = req.body;

        // Create a new document
        const newData = await onlineclassModel.create({ id, selectProgram, programFees, startDate, endDate, Photo, programTraining, selectLanguage, youTubeLink, Description });

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
        const onlineclassData = await onlineclassModel.find();
        res.status(200).send({
            status: true,
            msg: "onlineclassData retrieved succesfully",
            data: onlineclassData,
        });
    } catch (err) {
        return res
            .status(500)
            .send({ status: false, msg: "server error", error: err.message });
    }
};

const getById = async (req, res) => {
    const onlineclassId = req.params.onlineclassId;
    const onlineclassData = await onlineclassModel.findOne({
        onlineclassId: onlineclassId,
        isDeleted: false,
    });
    return res
        .status(200)
        .send({ status: true, msg: "Data fetch succesfully", data: onlineclassData });
};


const updateData = async (req, res) => {
    try {
        const { id, youTubeLink, Description, selectProgram, endDate, programFees, startDate, Photo, programTraining, selectLanguage } = req.body;

        let onlineclassId = req.params.onlineclassId;
        let updateBody = await onlineclassModel.findOneAndUpdate(
            { _id: onlineclassId },
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
                    onlineclassId: onlineclassId
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
        const result = await onlineclassModel.deleteMany({});
        res.send(`Deleted ${result.deletedCount} onlineclassdata`);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ status: false, msg: "server error", error: error.message });
    }
};
const DeleteById = async (req, res) => {
    try {
        let onlineclassId = req.params.onlineclassId;


        // Find and update in a single query
        const page = await onlineclassModel.findByIdAndUpdate(
            onlineclassId,
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
    onlineclassData,
    getData,
    getById,
    updateData,
    Deletedata,
    DeleteById,
};
