import React, { useEffect, useState } from "react";

import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";

import PublishButton from "../publish/publishButton";
import { SaveChangesPopup } from "../Home/savePopup";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const Testimonials = () => {
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [togglePop, setTogglePop] = useState(false);
    const [description, setDescription] = useState("");
    const [heading, setHeading] = useState("");
    const [activeSlideId, setActiveSlideId] = useState(1);
    const [image, setImage] = useState(null);
    const openPopUp = (slideId) => {
        setActiveSlideId(slideId);
        setTogglePop(true);
        setToggleSwitch(!toggleSwitch);
    };
    const closePopUp = () => {
        setActiveSlideId(1);
        setTogglePop(false);
    };
    function inputHeadingChange(e) {
        setHeading(e.target.value);
    }
    function inputDescriptionChange(e) {
        setDescription(e.target.value);
    }
    async function handleSwitch(e, activeSlideId) {
        // e.stopPropagation();
        try {
            const config = {
                method: "PUT",
                mode: "cors",
                url: `${API_BASE_URL}/updataabouteData/${1}`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: { Published: toggleSwitch },
            };
            const response = await axios(config);
            console.log(response?.data?.status);
            if (response?.data?.status) {
                toast.success("Published Successfully");
            }
        } catch (e) {
            console.log("Error:", e);
        }
    }
    const onSaveChanges = async () => {
        // Close the popup first
        closePopUp();
        // Proceed with saving changes
        if (activeSlideId !== null) {
            await handleSwitch(activeSlideId);
        }
    };


    const getAboutData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getaboutData`);
            setImage(response.data.data?.Photo);
            setActiveSlideId(response.data.data?.id);
            setToggleSwitch(response.data.data?.Published);
        } catch (e) {
            console.log("err", e);
        }
    };
    useEffect(() => {
        getAboutData();
    }, []);
    return (
        <>
            <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
                <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">New Comment</h2>


                <ImageUpload
                    selectedImage={image}
                    setImage={setImage}
                    setToggleSwitch={setToggleSwitch}
                    setActiveSlideId={setActiveSlideId}
                    toggleSwitch={toggleSwitch}
                    slideId={1}
                />


                <div className="flex flex-col font-['Roboto']">

                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Name</label>
                    <input
                        type="text"
                        className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                        value={heading}
                        placeholder="Type Heading here...."
                        name="mainHeading"
                        onChange={(e) => inputHeadingChange(e)}
                    />

                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Profession</label>
                    <input
                        className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto "
                        value={description}
                        placeholder="Type Description ...."
                        name="chapterDescription"
                        onChange={(e) => inputDescriptionChange(e)}
                    />
                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Comment</label>
                    <input
                        type="text"
                        className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                        value={heading}
                        placeholder="Type Heading here...."
                        name="mainHeading"
                        onChange={(e) => inputHeadingChange(e)}
                    />
                              <p className="ml-[30px] text-[12px] text-[#1A233899]">100/100 Words Remaining</p>

                    <SaveButton
                        open={togglePop}
                        onSave={onSaveChanges}
                        onClose={closePopUp}
                    />
                </div>
            </div>



        </>
    );
};

export default Testimonials;
