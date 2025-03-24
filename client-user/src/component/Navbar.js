import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ContactPopup from "./program/ContactPopup"; // Import ContactPopup

const Navbar = () => {
    const [smallHeading, setSmallHeading] = useState("");
    const [mainHeading, setMainHeading] = useState("");
    const [description, setDescription] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        getHeroData();
    }, []);
    const getHeroData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getData`);
            console.log("API Response:", response.data);

            if (response.data.status) {
                const data = response.data.data || {}; // Ensure data is always an object
                console.log("Extracted Data:", data);

                setSmallHeading(data?.SmallHeading?.trim() ? data.SmallHeading : "Shyama Yoga Studio");
                setMainHeading(data?.Heading?.trim() ? data.Heading : "Clear Mind & Refresh Your Body");
                setDescription(data?.Description?.trim() ? data.Description : "Lorem Ipsum...");
            }
        } catch (e) {
            console.error("Error fetching data:", e);

            // If API call fails, set default values
            setSmallHeading("Shyama Yoga Studio");
            setMainHeading("Clear Mind & Refresh Your Body");
            setDescription("Lorem Ipsum is simply dummy text of the printing and ypesetting industry. Lorem Ipsum has been the industry's ");
        }
    };

    return (
        <div className="relative w-full min-h-screen">
            {/* Background Image */}
            <img
                src="/Background.png"
                alt="Background"
                className="absolute w-full h-full object-cover"
            />

            {/* Navbar */}
            <div className="absolute top-0 left-0 w-full flex flex-col items-center lg:flex-row lg:justify-between lg:items-center px-10 py-5 border-b border-white/20">
                <img src="/Logo.png" alt="Logo" className="w-40 mx-auto lg:mx-0" />
                <button
                    className="hidden lg:block bg-[#361A06] text-white border border-[#FFF9E180] px-6 py-2 rounded-md"
                    onClick={() => setShowPopup(true)} // Open popup on click
                >
                    CONTACT US
                </button>
                {showPopup && <ContactPopup onClose={() => setShowPopup(false)} />}
            </div>


            {/* Hero Content */}
            {/* Hero Content */}
            <div className="relative flex flex-col items-center justify-center h-full text-center text-white space-y-4 px-5 pt-32">
                <p className="text-[#FD8531] font-bold uppercase font-plusjakarta text-xl md:text-2xl break-words whitespace-normal text-center">
                    {smallHeading}
                </p>
                <h1 className="font-bold text-4xl md:text-6xl leading-tight mt-2 max-w-2xl break-words text-center">
                    {mainHeading}
                </h1>
                <p className="text-[#FFF9E1] text-base md:text-lg max-w-xl mt-4 break-words text-center">
                    {description}
                </p>
                <button className="text-[#361A06] bg-[#FD8531] px-6 py-3 mt-6 rounded-md text-lg font-semibold">
                    SEE ALL COURSES
                </button>
            </div>
            {/* Person & Round Background */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <img
                    src="/rounds.png"
                    alt="Round Background"
                    className="absolute w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] -bottom-5"
                />
                <img
                    src="/Person.png"
                    alt="Person"
                    className="relative z-10 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
                />
            </div>
        </div>
    );
};

export default Navbar;
