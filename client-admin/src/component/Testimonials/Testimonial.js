import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import SaveButton from "../Buttons/saveButton";
import ImageUpload from "./imageUpload";

const Testimonials = () => {
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);
    const [testimonialId, setTestimonialId] = useState(null);


    useEffect(() => {
        getTestimonialData();
    }, []);

    // Fetch testimonial data
    const getTestimonialData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gettestimonialdata`);
            if (response.data.status && response.data.data.length > 0) {
                const data = response.data.data[0];
                setName(data.Name);
                setProfession(data.Profession);
                setComment(data.comment);
                setImage(data.Photo);
                setTestimonialId(data.id);
            }
        } catch (error) {
            console.error("Error fetching testimonial data:", error);
        }
    };


    // Handle image upload

    // Handle save changes
    const onSaveChanges = async () => {
        try {
            const payload = { id: testimonialId, Photo: image, comment: comment, Profession: profession, Name: name };

            const apiUrl = testimonialId
                ? `${API_BASE_URL}/updatetestimonialdata/${testimonialId}` // Update existing data
                : `${API_BASE_URL}/createtestimonial`; // Create new data

            const response = await axios.post(apiUrl, payload);
            if (response?.data?.status) {
                toast.success("Data Saved Successfully");
                getTestimonialData(); // Refresh UI with latest data
            }
        } catch (error) {
            console.error("Error saving About data:", error);
        }
    };

    return (
        <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
            <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">New Comment</h2>

            <ImageUpload selectedImage={image} setImage={setImage} />

            <div className="flex flex-col font-['Roboto']">
                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Name</label>
                <input
                    type="text"
                    className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                    value={name}
                    placeholder="Type Name here...."
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Profession</label>
                <input
                    type="text"
                    className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                    value={profession}
                    placeholder="Type Profession here...."
                    onChange={(e) => setProfession(e.target.value)}
                />

                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Comment</label>
                <textarea
                    className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
                    value={comment}
                    placeholder="Type Comment ...."
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <p className="ml-[30px] text-[12px] text-[#1A233899]">100/100 Words Remaining</p>

                <SaveButton onSave={onSaveChanges} />
            </div>
        </div>
    );
};

export default Testimonials;