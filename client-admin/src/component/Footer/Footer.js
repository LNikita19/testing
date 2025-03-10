import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
    const [location, setLocation] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [xLink, setXLink] = useState("");
    const [activeSlideId, setActiveSlideId] = useState(null);
    const [image, setImage] = useState(null);

    // const openPopUp = () => {
    //     setTogglePop(true);
    // };


    // const closePopUp = () => {
    //     setTogglePop(false);
    // };

    const onSaveChanges = async () => {
        try {
            const formData = new FormData();

            if (image) {
                formData.append("Photo", image);
            }
            formData.append("Location", location || "");
            formData.append("ContactNumber", contactNumber || "");
            formData.append("instagramLink", instagramLink || "");
            formData.append("FacebookLink", facebookLink || "");
            formData.append("YouTubeLink", youtubeLink || "");
            formData.append("XLink", xLink || "");

            let response;
            if (activeSlideId) {
                // Update existing footer data
                response = await axios.put(`${API_BASE_URL}/updatefooterData/${activeSlideId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Create new footer data
                response = await axios.post(`${API_BASE_URL}/footerData`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response?.data?.status) {
                setActiveSlideId(response.data.data._id);
                toast.success(activeSlideId ? "Updated Successfully" : "Created Successfully");
            } else {
                toast.error("Failed to save data");
            }
        } catch (e) {
            console.error("Error saving footer data:", e);
            toast.error("Error saving data");
        }
    };


    const getFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getfooterData`);
            const data = response?.data?.data;
            if (data) {
                setImage(data.Photo);
                setLocation(data.Location);
                setContactNumber(data.ContactNumber);
                setInstagramLink(data.instagramLink);
                setFacebookLink(data.FacebookLink);
                setYoutubeLink(data.YouTubeLink);
                setXLink(data.XLink);
                setActiveSlideId(data.id);
            }
        } catch (e) {
            console.error("Error fetching footer data:", e);
        }
    };

    useEffect(() => {
        getFooterData();
    }, []);

    return (
        <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
            <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">Footer Section</h2>

            <ImageUpload selectedImage={image} setImage={setImage} />

            <div className="flex flex-col space-y-6 font-['Roboto']">
                <div className="flex flex-col">
                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Location</label>
                    <input
                        type="text"
                        className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                        value={location}
                        placeholder="Enter location..."
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Contact Number</label>
                    <input
                        type="text"
                        className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
                        value={contactNumber}
                        placeholder="Enter contact number..."
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-row space-x-3">
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Instagram Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={instagramLink}
                                placeholder="Enter Instagram link..."
                                onChange={(e) => setInstagramLink(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Facebook Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={facebookLink}
                                placeholder="Enter Facebook link..."
                                onChange={(e) => setFacebookLink(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">YouTube Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={youtubeLink}
                                placeholder="Enter YouTube link..."
                                onChange={(e) => setYoutubeLink(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">X Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={xLink}
                                placeholder="Enter X link..."
                                onChange={(e) => setXLink(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SaveButton onSave={onSaveChanges} />
        </div>
    );
};

export default Footer;
