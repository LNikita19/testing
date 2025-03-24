import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FaCircle } from "react-icons/fa";

const defaultData = {
    Heading: "Clear Mind & Refresh Your Body",
    Description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    PhotoCarousel: [
        "/p1.png",
        "/Image3.png",
        "/p1.png"
    ],
    Points: ["Neck Pain", "Peace", "Happiness"]
};

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getaboutData`);
                if (response.data.status && response.data.data.length > 0) {
                    setAboutData(response.data.data[0]); // Fetch latest data
                } else {
                    setAboutData(defaultData);
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
                setAboutData(defaultData);
            }
        };

        fetchData();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-scroll image carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % (aboutData?.PhotoCarousel.length || 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [aboutData]);

    if (!aboutData) return <p>Loading...</p>;

    return (
        <div className="bg-[#FFF4C0] p-6 flex justify-center">
            <div className="border border-[#361A0640] rounded-xl p-6 shadow-lg bg-white w-[90%] md:w-[60%] flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left px-6">
                    <h2 className="text-[#D17A0E] uppercase text-sm font-bold">SHYAMA YOGA STUDIO</h2>
                    <h1 className="text-3xl font-bold mt-2">{aboutData.Heading}</h1>
                    <p className="text-gray-700 mt-2">{aboutData.Description}</p>
                    <ul className="mt-4 list-disc list-inside space-y-1 text-gray-600">
                        {aboutData.Points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>

                {/* Image Carousel */}
                <div className="md:w-1/2 flex flex-col items-center relative mt-4 md:mt-0">
                    <img
                        src={aboutData.PhotoCarousel[currentImageIndex]}
                        alt="Yoga"
                        className="w-72 md:w-96 rounded-lg shadow-md transition-all duration-500"
                    />
                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-2 mt-2">
                        {aboutData.PhotoCarousel.map((_, index) => (
                            <FaCircle
                                key={index}
                                className={`text-xs ${currentImageIndex === index ? "text-[#D17A0E]" : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;



// PhotoCarousel: [
//     "/p1.png",
//     "/Image3.png",
//     "/p1.png"
// ],