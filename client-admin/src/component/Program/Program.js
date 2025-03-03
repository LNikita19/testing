import React, { useState } from "react";
import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";

const Program = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [program, setProgram] = useState("");
    const [programFee, setProgramFee] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timing, setTiming] = useState("");
    const [language, setLanguage] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    const handleSave = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/updateProgramData`, {
                image, program, programFee, startDate, endDate, timing, language, youtubeLink, description
            });
            if (response?.data?.status) {
                toast.success("Program Saved Successfully");
            }
        } catch (error) {
            console.error("Error saving program:", error);
        }
    };

    return (
        <div className="max-w-3xl ml-[90px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-[#361A06] mb-8">New Program</h2>
            <label className="text-sm font-bold text-[#361A06] mb-2 block">Photo 1</label>
            <ImageUpload selectedImage={image} setImage={setImage} />

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 ">Select Program</label>
                    <select value={program} onChange={(e) => setProgram(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="program1">Program 1</option>
                        <option value="program2">Program 2</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Program Fee</label>
                    <select value={programFee} onChange={(e) => setProgramFee(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="100">$100</option>
                        <option value="200">$200</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-3 w-full rounded-md" />
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-3 w-full rounded-md" />
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Program Timing</label>
                    <select value={timing} onChange={(e) => setTiming(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div>
            </div>

            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 block">Add YouTube Link</label>
                <input type="text" placeholder="Type Heading here..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="border p-3 w-full rounded-md" />
            </div>

            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 block">Description</label>
                <textarea placeholder="Type Heading here..." value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 w-full rounded-md" rows="4"></textarea>
                <p className="text-sm text-gray-500">100/100 Words Remaining</p>
            </div>

            <div className="flex justify-start mt-2 gap-4">

                <SaveButton onClick={handleSave} className="px-4 py-2 bg-[#FF7A00] text-white rounded-md font-bold" />
            </div>
        </div>
    );
};

export default Program;
