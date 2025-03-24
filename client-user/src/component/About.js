import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getaboutData`);
                if (response.data.status && response.data.data.length > 0) {
                    setAboutData(response.data.data[0]); // Fetch latest data
                }
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };

        fetchData();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!aboutData) return <p>Loading...</p>;

    return (
        <div className='bg-[#FFF4C0] p-6'>
            <div className='border border-[#361A0640] rounded-lg p-6'>
                {isMobile ? (
                    <div className='flex flex-col items-center text-center'>
                        <img src={aboutData.Photo1} alt='About' className='w-full max-w-[300px] mb-4' />
                        <h1 className='text-2xl font-bold'>{aboutData.Heading}</h1>
                        <p className='text-sm text-gray-700 mt-2'>{aboutData.Description}</p>
                        {/* Static Section */}
                        <div className="mt-6">
                            <div className="flex flex-col space-y-4">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold">Healthy</h2>
                                    <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold">Flexibility</h2>
                                    <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold">Balance</h2>
                                    <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-col max-w-[50%]'>
                            <h1 className='text-3xl font-bold'>{aboutData.Heading}</h1>
                            <p className='text-gray-700 mt-2'>{aboutData.Description}</p>
                            {/* Static Section */}
                            <div className="mt-6">
                                <div className="flex flex-row space-x-8">
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold">Healthy</h2>
                                        <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold">Flexibility</h2>
                                        <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-bold">Balance</h2>
                                        <p className="text-sm text-gray-700">Lorem IpsuAm is simply dummy text of the printing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={aboutData.Photo} alt='About' className='w-[400px] rounded-lg' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;